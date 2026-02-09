import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import axios from 'axios';
import FormData from 'form-data';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'Ingen fil uppladdad' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const ocrForm = new FormData();
    ocrForm.append('file', buffer, file.name);
    ocrForm.append('apikey', process.env.OCR_SPACE_API_KEY || '');
    ocrForm.append('language', 'auto');
    ocrForm.append('OCREngine', '2');
    ocrForm.append('scale', 'true');
    ocrForm.append('isOverlayRequired', 'false');

    const ocrResponse = await axios.post('https://api.ocr.space/parse/image', ocrForm, {
      headers: ocrForm.getHeaders(),
      timeout: 120000,
    });

    const ocrData = ocrResponse.data;

    if (ocrData.IsErroredOnProcessing || !ocrData.ParsedResults?.[0]) {
      throw new Error(ocrData.ErrorMessage?.join(' ') || 'OCR misslyckades');
    }

    const fullText = ocrData.ParsedResults.map((r: any) => r.ParsedText).join('\n');
    const lines = fullText.split('\n');

    let amount = 'Ej hittat';
    let dueDate = 'Ej hittat';
    let supplier = 'Telavox AB';
    let invoiceNumber = 'Ej hittat';
    let ocrNumber = 'Ej hittat';
    let bankgiro = 'Ej hittat';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      const lowerLine = line.toLowerCase();

      // Belopp – fångar "Summa (SEK)" eller "Kvar att Betala (SEK)" med (inkl. moms)
      if (lowerLine.includes('summa (sek)') || lowerLine.includes('kvar att betala (sek)')) {
        const match = line.match(/([\d\s,]+)(?:,\d+)?\s*\(inkl\. moms\)/i);
        if (match) {
          amount = match[1].trim().replace(/\s/g, '').replace(',', '.') + ' kr';
        }
      }

      // Förfallodatum – sista förekomsten (avi i botten)
      if (lowerLine.includes('förfallodatum')) {
        const match = line.match(/([\d]{4}-[\d]{2}-[\d]{2})/);
        if (match) {
          dueDate = match[1];
        }
      }

      // Fakturanummer
      if (lowerLine.includes('fakturanummer')) {
        const match = line.match(/(\d{10,})/);
        if (match) {
          invoiceNumber = match[1];
        }
      }

      // Bankgiro
      if (lowerLine.includes('bankgiro')) {
        const match = line.match(/(\d{4}-\d{4})/);
        if (match) {
          bankgiro = match[1];
        }
      }

      // OCR-nummer – bottenraden med # och >
      if (line.includes('#') && line.includes('>')) {
        const match = line.match(/(\d{10,})/);
        if (match) {
          ocrNumber = match[1];
          if (invoiceNumber === 'Ej hittat') {
            invoiceNumber = ocrNumber;
          }
        }
      }
    }

    const parsed = {
      amount,
      dueDate,
      supplier,
      invoiceNumber,
      ocrNumber,
      bankgiro,
    };

    const fileName = `${parsed.invoiceNumber || Date.now()}-${file.name.replace(/\s/g, '_')}`;
    const { error: storageError } = await supabase.storage
      .from('invoices')
      .upload(fileName, buffer, { contentType: file.type, upsert: true });

    if (storageError) throw storageError;

    const { data: { publicUrl: pdfUrl } } = supabase.storage.from('invoices').getPublicUrl(fileName);

    const { error: dbError } = await supabase
      .from('invoices')
      .upsert({
        invoice_number: parsed.invoiceNumber === 'Ej hittat' ? null : parsed.invoiceNumber,
        amount: parsed.amount,
        due_date: parsed.dueDate,
        supplier: parsed.supplier,
        ocr_number: parsed.ocrNumber,
        bankgiro: parsed.bankgiro,
        pdf_url: pdfUrl,
      }, { onConflict: 'invoice_number' });

    if (dbError) throw dbError;

    return NextResponse.json({ parsed, pdfUrl, success: true });

  } catch (err: any) {
    console.error('Fel:', err);
    return NextResponse.json({ error: err.message || 'Något gick fel' }, { status: 500 });
  }
}