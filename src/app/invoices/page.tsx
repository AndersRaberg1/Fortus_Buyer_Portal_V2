'use client';

import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Invoices() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [filteredInvoices, setFilteredInvoices] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [latestParsed, setLatestParsed] = useState<any>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [extensionDays, setExtensionDays] = useState(30);

  const fetchInvoices = async () => {
    const { data, error } = await supabase
      .from('invoices')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setInvoices(data || []);
      setFilteredInvoices(data || []);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  // Client-side sök/filter
  useEffect(() => {
    const lowerSearch = searchTerm.toLowerCase();
    const filtered = invoices.filter(inv => 
      inv.invoice_number?.toLowerCase().includes(lowerSearch) ||
      inv.supplier?.toLowerCase().includes(lowerSearch) ||
      inv.amount?.toLowerCase().includes(lowerSearch)
    );
    setFilteredInvoices(filtered);
  }, [searchTerm, invoices]);

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    setLoading(true);
    setError(null);
    setLatestParsed(null);

    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/extract-pdf', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || 'Upload misslyckades');

      setLatestParsed(result.parsed);
      await fetchInvoices();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteInvoice = async (inv: any) => {
    if (!confirm('Radera fakturan permanent?')) return;

    // Delete file från storage
    if (inv.pdf_url) {
      const fileName = inv.pdf_url.split('/').pop();
      await supabase.storage.from('invoices').remove([fileName || '']);
    }

    // Delete row från DB
    const { error } = await supabase.from('invoices').delete().eq('id', inv.id);

    if (error) {
      setError(error.message);
    } else {
      await fetchInvoices();
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': [], 'image/*': [] },
    maxFiles: 1,
  });

  // FortusFlex-kalkyl
  const calculateFee = () => {
    if (!selectedInvoice || selectedInvoice.amount === 'Ej hittat') return { fee: 0, total: 0, newDueDate: '' };

    const amount = parseFloat(selectedInvoice.amount.replace(' kr', ''));
    const feeRate = 0.015; // 1.5% per 30 dagar – justera efter verklig modell
    const periods = Math.ceil(extensionDays / 30);
    const fee = amount * feeRate * periods;
    const total = amount + fee;

    const originalDue = new Date(selectedInvoice.due_date);
    const newDue = new Date(originalDue);
    newDue.setDate(originalDue.getDate() + extensionDays);

    return {
      fee: fee.toFixed(2),
      total: total.toFixed(2),
      newDueDate: newDue.toISOString().split('T')[0],
    };
  };

  const { fee, total, newDueDate } = calculateFee();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <h1 className="text-3xl font-bold mb-8">Fakturor & ordrar</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Ladda upp ny faktura</h2>
        <div {...getRootProps()} className={`border-4 border-dashed rounded-xl p-12 text-center cursor-pointer transition ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
          <input {...getInputProps()} />
          <p className="text-xl">{isDragActive ? 'Släpp filen här' : 'Dra och släpp PDF/bild eller klicka'}</p>
          {loading && <p className="mt-4 text-blue-600">Bearbetar...</p>}
          {error && <p className="mt-4 text-red-600">{error}</p>}
        </div>
      </section>

      {latestParsed && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Nyuppladdad faktura</h2>
          <div className="bg-green-50 dark:bg-green-900 rounded-xl shadow p-6">
            <p><strong>Belopp:</strong> {latestParsed.amount}</p>
            <p><strong>Förfallodatum:</strong> {latestParsed.dueDate}</p>
            <p><strong>Leverantör:</strong> {latestParsed.supplier}</p>
            <p><strong>Fakturanummer:</strong> {latestParsed.invoiceNumber}</p>
            <p><strong>OCR-nummer:</strong> {latestParsed.ocrNumber}</p>
            <p><strong>Bankgiro:</strong> {latestParsed.bankgiro}</p>
          </div>
        </section>
      )}

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Sparade fakturor</h2>
        
        {/* Sök/filter */}
        <input
          type="text"
          placeholder="Sök på fakturanummer, leverantör eller belopp..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 mb-6 border rounded-lg dark:bg-gray-800"
        />

        {filteredInvoices.length === 0 ? (
          <p>Inga fakturor (eller ingen match).</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInvoices.map((inv) => (
              <div key={inv.id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 relative">
                <button
                  onClick={() => deleteInvoice(inv)}
                  className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-sm"
                >
                  Radera
                </button>
                <p><strong>Belopp:</strong> {inv.amount || 'Ej hittat'}</p>
                <p><strong>Förfallodatum:</strong> {inv.due_date || 'Ej hittat'}</p>
                <p><strong>Leverantör:</strong> {inv.supplier || 'Ej hittat'}</p>
                <p><strong>Fakturanummer:</strong> {inv.invoice_number || 'Ej hittat'}</p>
                <p><strong>OCR-nummer:</strong> {inv.ocr_number || 'Ej hittat'}</p>
                <p><strong>Bankgiro:</strong> {inv.bankgiro || 'Ej hittat'}</p>
                <a href={inv.pdf_url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-blue-600 hover:underline">
                  Öppna PDF
                </a>
                <button
                  onClick={() => setSelectedInvoice(inv)}
                  className="mt-4 ml-4 text-green-600 hover:underline"
                >
                  FortusFlex-kalkyl
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FortusFlex-kalkylator */}
      {selectedInvoice && (
        <section className="mb-12 bg-blue-50 dark:bg-blue-900 rounded-xl p-8">
          <h2 className="text-2xl font-semibold mb-4">FortusFlex för faktura {selectedInvoice.invoice_number}</h2>
          <p><strong>Aktuellt belopp:</strong> {selectedInvoice.amount}</p>
          <p><strong>Nuvarande förfallodatum:</strong> {selectedInvoice.due_date}</p>

          <label className="block mt-6">
            <span className="text-lg">Förlängning (dagar):</span>
            <input
              type="range"
              min="15"
              max="90"
              step="15"
              value={extensionDays}
              onChange={(e) => setExtensionDays(Number(e.target.value))}
              className="w-full mt-2"
            />
            <span className="block text-center text-xl mt-2">{extensionDays} dagar</span>
          </label>

          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="bg-white dark:bg-gray-800 p-4 rounded">
              <p className="text-sm">Avgift</p>
              <p className="text-2xl font-bold">{fee} kr</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded">
              <p className="text-sm">Total kostnad</p>
              <p className="text-2xl font-bold">{total} kr</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded">
              <p className="text-sm">Nytt förfallodatum</p>
              <p className="text-2xl font-bold">{newDueDate}</p>
            </div>
          </div>

          <button onClick={() => setSelectedInvoice(null)} className="mt-6 text-sm text-gray-600">
            Stäng kalkylator
          </button>
        </section>
      )}
    </div>
  );
}