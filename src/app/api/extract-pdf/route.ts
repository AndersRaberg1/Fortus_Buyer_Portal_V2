import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import axios from 'axios';
import FormData from 'form-data';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
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

    // OCR Space call (oförändrad – kort och effektiv)
    const ocrForm = new FormData();
    ocrForm.append('file', buffer, file.name);
    ocrForm.append('apikey', process.env.OCR_SPACE_API_KEY || '');
    ocrForm.append('language', 'swe');
    ocrForm.append('OCREngine', '2');

    const ocrResponse = await axios.post('https://api.ocr.space/parse/image', ocrForm, {
      headers: ocrForm.getHeaders(),
      timeout: 120000,
    });

    const ocrData = ocrResponse.data;

    if (ocrData.IsErroredOnProcessing || !ocrData.ParsedResults?.[0]) {
      throw new Error(ocrData.ErrorMessage?.join(' ') || 'OCR misslyckades');
    }

    const fullText = ocrData.ParsedResults.map((r: any) => r.ParsedText).join('\n');

    // Förenklad parsing – bara essentiella fält med enkla regex (mindre kod, mindre fel)
    const parsed = {
      amount: fullText.match(/summa.*?([\d\s,]+)\s*kr/i)?.[1].replace(/\s/g, '').replace(',', '.') + ' kr' || 'Ej hittat',
      dueDate: fullText.match(/förfallodatum.*?(\d{4}-\d{2}-\d{2})/i)?.[1] || 'Ej hittat',
      supplier: 'Telavox AB',
      invoiceNumber: fullText.match(/fakturanummer.*?(\d{8,})/i)?.[1] || 'Ej hittat',
      ocrNumber: fullText.match(/OCR.*?(\d{10,})/i)?.[1] || 'Ej hittat',
      bankgiro: fullText.match(/bankgiro.*?(\d{4}-\d{4})/i)?.[1] || 'Ej hittat',
    };

    // Storage + DB (oförändrad – kort och effektiv)
    const fileName = `${parsed.invoiceNumber || Date.now()}-${file.name.replace(/\s/g, '_')}`;
    const { error: storageError } = await supabase.storage
      .from('invoices')
      .upload(fileName, buffer, { contentType: file.type, upsert: true });

    if (storageError) throw storageError;

    const { data: { publicUrl: pdfUrl } } = supabase.storage.from('invoices').getPublicUrl(fileName);

    const { error: dbError } = await supabase.from('invoices').upsert({
      invoice_number: parsed.invoiceNumber,
      amount: parsed.amount,
      due_date: parsed.dueDate,
      supplier: parsed.supplier,
      ocr_number: parsed.ocrNumber,
      bankgiro: parsed.bankgiro,
      pdf_url: pdfUrl,
    });

    if (dbError) throw dbError;

    return NextResponse.json({ parsed, pdfUrl, success: true });
  } catch (err: any) {
    console.error('Fel:', err);
    return NextResponse.json({ error: err.message || 'Något gick fel' }, { status: 500 });
  }
}
