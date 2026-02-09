'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function FortusFlex() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [extensionDays, setExtensionDays] = useState(30);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('invoices').select('*');
      setInvoices(data || []);
    };
    fetch();
  }, []);

  const calculate = () => {
    if (!selectedInvoice) return { fee: 0, total: 0, newDueDate: '' };

    const amount = parseFloat(selectedInvoice.amount.replace(' kr', ''));
    const feeRate = 0.015;
    const periods = Math.ceil(extensionDays / 30);
    const fee = amount * feeRate * periods;
    const total = amount + fee;

    const original = new Date(selectedInvoice.due_date);
    const newDue = new Date(original);
    newDue.setDate(original.getDate() + extensionDays);

    return {
      fee: fee.toFixed(2),
      total: total.toFixed(2),
      newDueDate: newDue.toISOString().split('T')[0],
    };
  };

  const { fee, total, newDueDate } = calculate();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-blue-600">FortusFlex – Förläng betalningstid</h1>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Välj faktura för kalkyl</h2>
        <select onChange={(e) => setSelectedInvoice(invoices.find(i => i.id === e.target.value))} className="w-full p-4 border rounded-xl dark:bg-gray-700 focus:ring-2 focus:ring-blue-500">
          <option value="">Välj en faktura</option>
          {invoices.map(inv => (
            <option key={inv.id} value={inv.id}>
              {inv.invoice_number} – {inv.amount} (förfaller {inv.due_date})
            </option>
          ))}
        </select>
      </div>

      {selectedInvoice && (
        <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900 dark:to-green-900 rounded-2xl shadow-xl p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div>
              <p className="text-lg"><strong>Belopp:</strong> {selectedInvoice.amount}</p>
              <p className="text-lg"><strong>Aktuellt förfallodatum:</strong> {selectedInvoice.due_date}</p>
            </div>
          </div>

          <label className="block mb-10">
            <span className="text-xl font-medium mb-4 block">Förlängning (dagar):</span>
            <input type="range" min="15" max="90" step="15" value={extensionDays} onChange={(e) => setExtensionDays(Number(e.target.value))} className="w-full h-4 bg-gray-300 rounded-lg appearance-none cursor-pointer" />
            <span className="block text-center text-3xl font-bold mt-4 text-blue-600">{extensionDays} dagar</span>
          </label>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
              <p className="text-lg text-gray-600">Avgift</p>
              <p className="text-4xl font-bold text-red-600">{fee} kr</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
              <p className="text-lg text-gray-600">Total kostnad</p>
              <p className="text-4xl font-bold text-orange-600">{total} kr</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
              <p className="text-lg text-gray-600">Nytt förfallodatum</p>
              <p className="text-4xl font-bold text-green-600">{newDueDate}</p>
            </div>
          </div>

          <div className="text-center mt-10">
            <button className="bg-green-600 text-white text-xl px-12 py-5 rounded-xl hover:bg-green-700 transition shadow-lg">
              Signera med BankID (mock)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}