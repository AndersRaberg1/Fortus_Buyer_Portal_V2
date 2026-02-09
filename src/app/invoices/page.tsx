'use client';

import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { Trash2, Search } from 'lucide-react';

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

  const fetchInvoices = async () => {
    const { data, error } = await supabase.from('invoices').select('*').order('created_at', { ascending: false });
    if (error) setError(error.message);
    else {
      setInvoices(data || []);
      setFilteredInvoices(data || []);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  useEffect(() => {
    const lower = searchTerm.toLowerCase();
    setFilteredInvoices(invoices.filter(inv => 
      inv.invoice_number?.toLowerCase().includes(lower) ||
      inv.supplier?.toLowerCase().includes(lower) ||
      inv.amount?.toLowerCase().includes(lower)
    ));
  }, [searchTerm, invoices]);

  const onDrop = async (acceptedFiles: File[]) => {
    if (!acceptedFiles.length) return;

    setLoading(true);
    setError(null);
    setLatestParsed(null);

    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/extract-pdf', { method: 'POST', body: formData });
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

    if (inv.pdf_url) {
      const fileName = inv.pdf_url.split('/').pop();
      await supabase.storage.from('invoices').remove([fileName]);
    }

    const { error } = await supabase.from('invoices').delete().eq('id', inv.id);
    if (error) setError(error.message);
    else await fetchInvoices();
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': [], 'image/*': [] },
    maxFiles: 1,
  });

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
        Fakturor
      </h1>

      <section className="mb-16 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12">
        <h2 className="text-3xl font-semibold mb-8">Ladda upp ny faktura</h2>
        <div {...getRootProps()} className={`border-4 border-dashed rounded-3xl p-20 md:p-32 text-center cursor-pointer transition-all duration-300 ${isDragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900 scale-105' : 'border-gray-300 hover:border-blue-500 hover:shadow-xl'}`}>
          <input {...getInputProps()} />
          <p className="text-2xl md:text-3xl font-bold text-gray-700 dark:text-gray-300">
            {isDragActive ? 'Släpp filen här' : 'Dra och släpp PDF/bild eller klicka'}
          </p>
          {loading && <p className="mt-6 text-2xl text-blue-600 animate-pulse">Bearbetar fakturan...</p>}
          {error && <p className="mt-6 text-2xl text-red-600">{error}</p>}
        </div>
      </section>

      {latestParsed && (
        <section className="mb-16 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900 rounded-3xl shadow-2xl p-10">
          <h2 className="text-3xl font-semibold mb-8">Nyuppladdad faktura</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-lg">
            <p><strong>Belopp:</strong> <span className="text-3xl font-bold text-blue-600">{latestParsed.amount}</span></p>
            <p><strong>Förfallodatum:</strong> <span className="text-2xl font-bold">{latestParsed.dueDate}</span></p>
            <p><strong>Leverantör:</strong> {latestParsed.supplier}</p>
            <p><strong>Fakturanummer:</strong> {latestParsed.invoiceNumber}</p>
            <p><strong>OCR-nummer:</strong> {latestParsed.ocrNumber}</p>
            <p><strong>Bankgiro:</strong> {latestParsed.bankgiro}</p>
          </div>
        </section>
      )}

      <section>
        <h2 className="text-3xl font-semibold mb-8">Sparade fakturor</h2>

        <div className="relative mb-10">
          <Search className="absolute left-4 top-4 w-6 h-6 text-gray-500" />
          <input
            type="text"
            placeholder="Sök på fakturanummer, leverantör eller belopp..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-5 text-lg border-2 rounded-2xl dark:bg-gray-800 focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        {filteredInvoices.length === 0 ? (
          <p className="text-center text-2xl text-gray-500 py-20">Inga fakturor (eller ingen match).</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredInvoices.map((inv) => (
              <div key={inv.id} className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 hover:scale-105 hover:shadow-3xl transition-all duration-300">
                <button
                  onClick={() => deleteInvoice(inv)}
                  className="float-right text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-8 h-8" />
                </button>
                <div className="space-y-6">
                  <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                    {inv.amount || 'Ej hittat'}
                  </p>
                  <div className="space-y-3 text-lg">
                    <p><strong>Förfallodatum:</strong> <span className="font-bold">{inv.due_date || 'Ej hittat'}</span></p>
                    <p><strong>Leverantör:</strong> {inv.supplier || 'Ej hittat'}</p>
                    <p><strong>Fakturanummer:</strong> {inv.invoice_number || 'Ej hittat'}</p>
                    <p><strong>OCR-nummer:</strong> {inv.ocr_number || 'Ej hittat'}</p>
                    <p><strong>Bankgiro:</strong> {inv.bankgiro || 'Ej hittat'}</p>
                  </div>
                </div>
                <div className="mt-8 flex gap-4">
                  <a href={inv.pdf_url} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-2xl hover:from-blue-700 hover:to-blue-800 transition shadow-lg text-lg font-medium">
                    Öppna PDF
                  </a>
                  <Link href="/fortusflex" className="flex-1 text-center bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-2xl hover:from-green-700 hover:to-green-800 transition shadow-lg text-lg font-medium">
                    FortusFlex-kalkyl
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}