'use client';

import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { Trash2, Search, Upload } from 'lucide-react';

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

  useEffect(() => {
    const lower = searchTerm.toLowerCase();
    setFilteredInvoices(
      invoices.filter(
        (inv) =>
          inv.invoice_number?.toLowerCase().includes(lower) ||
          inv.supplier?.toLowerCase().includes(lower) ||
          inv.amount?.toLowerCase().includes(lower) ||
          inv.due_date?.toLowerCase().includes(lower)
      )
    );
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

      if (!res.ok) {
        throw new Error(result.error || 'Upload misslyckades');
      }

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

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-5xl font-bold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
        Fakturor
      </h1>

      {/* Upload-sektion */}
      <section className="mb-20">
        <h2 className="text-3xl font-semibold mb-10">Ladda upp ny faktura</h2>
        <div
          {...getRootProps()}
          className={`bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-3xl p-24 md:p-32 text-center cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
            isDragActive ? 'ring-8 ring-blue-500' : ''
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="w-32 h-32 mx-auto mb-10 text-blue-600" />
          <p className="text-3xl md:text-4xl font-bold text-blue-800 dark:text-blue-200">
            {isDragActive ? 'Släpp filen här' : 'Dra och släpp PDF/bild eller klicka'}
          </p>
          {loading && <p className="mt-10 text-3xl text-blue-600 animate-pulse">Bearbetar fakturan...</p>}
          {error && <p className="mt-10 text-3xl text-red-600">{error}</p>}
        </div>
      </section>

      {/* Nyuppladdad faktura */}
      {latestParsed && (
        <section className="mb-20 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900 rounded-3xl shadow-2xl p-12">
          <h2 className="text-3xl font-semibold mb-10">Nyuppladdad faktura</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-xl">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <p className="text-gray-600">Belopp</p>
              <p className="text-5xl font-bold text-blue-600">{latestParsed.amount}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <p className="text-gray-600">Förfallodatum</p>
              <p className="text-4xl font-bold">{latestParsed.dueDate}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <p className="text-gray-600">Leverantör</p>
              <p className="text-3xl font-bold">{latestParsed.supplier}</p>
            </div>
            <div className="col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <p><strong>Fakturanummer:</strong> <span className="font-bold text-xl">{latestParsed.invoiceNumber}</span></p>
              <p><strong>OCR-nummer:</strong> <span className="font-bold text-xl">{latestParsed.ocrNumber}</span></p>
              <p><strong>Bankgiro:</strong> <span className="font-bold text-xl">{latestParsed.bankgiro}</span></p>
            </div>
          </div>
        </section>
      )}

      {/* Sparade fakturor */}
      <section>
        <h2 className="text-3xl font-semibold mb-10">Sparade fakturor</h2>

        <div className="relative mb-12">
          <Search className="absolute left-6 top-5 w-10 h-10 text-gray-500" />
          <input
            type="text"
            placeholder="Sök på fakturanummer, leverantör eller belopp..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-24 pr-8 py-6 text-xl border-2 rounded-3xl dark:bg-gray-800 focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        {filteredInvoices.length === 0 ? (
          <p className="text-center text-3xl text-gray-500 py-32">Inga fakturor (eller ingen match).</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredInvoices.map((inv) => (
              <div
                key={inv.id}
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10 hover:scale-105 hover:shadow-3xl transition-all duration-500 relative"
              >
                <button
                  onClick={() => deleteInvoice(inv)}
                  className="absolute top-6 right-6 text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-12 h-12" />
                </button>
                <div className="space-y-8">
                  <p className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                    {inv.amount || 'Ej hittat'}
                  </p>
                  <div className="space-y-6 text-2xl">
                    <p>
                      <strong>Förfallodatum:</strong>{' '}
                      <span className="font-bold text-3xl">{inv.due_date || 'Ej hittat'}</span>
                    </p>
                    <p>
                      <strong>Leverantör:</strong>{' '}
                      <span className="font-bold text-2xl">{inv.supplier || 'Ej hittat'}</span>
                    </p>
                    <p>
                      <strong>Fakturanummer:</strong>{' '}
                      <span className="font-bold text-2xl">{inv.invoice_number || 'Ej hittat'}</span>
                    </p>
                    <p>
                      <strong>OCR-nummer:</strong>{' '}
                      <span className="font-bold text-2xl">{inv.ocr_number || 'Ej hittat'}</span>
                    </p>
                    <p>
                      <strong>Bankgiro:</strong>{' '}
                      <span className="font-bold text-2xl">{inv.bankgiro || 'Ej hittat'}</span>
                    </p>
                  </div>
                </div>
                <div className="mt-12 flex gap-8">
                  <a
                    href={inv.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white py-6 rounded-3xl hover:from-blue-700 hover:to-blue-800 transition shadow-2xl text-2xl font-semibold"
                  >
                    Öppna PDF
                  </a>
                  <Link
                    href="/fortusflex"
                    className="flex-1 text-center bg-gradient-to-r from-green-600 to-green-700 text-white py-6 rounded-3xl hover:from-green-700 hover:to-green-800 transition shadow-2xl text-2xl font-semibold"
                  >
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