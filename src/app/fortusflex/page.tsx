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
    const fetchInvoices = async () => {
      const { data } = await supabase.from('invoices').select('*');
      setInvoices(data || []);
    };
    fetchInvoices();
  }, []);

  const calculateFee = () => {
    if (!selectedInvoice || selectedInvoice.amount === 'Ej hittat') return { fee: 0, total: 0, newDueDate: '' };

    const amount = parseFloat(selectedInvoice.amount.replace(' kr', ''));
    const feeRate = 0.015; // 1.5% per 30 dagar
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
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">FortusFlex – Förläng betalningstid</h1>

      <h2 className="text-2xl mb-4">Välj faktura</h2>
      <select onChange={(e) => setSelectedInvoice(invoices.find(inv => inv.id === e.target.value))} className="w-full p-3 border rounded mb-8">
        <option value="">Välj en faktura</option>
        {invoices.map(inv => (
          <option key={inv.id} value={inv.id}>
            {inv.invoice_number} – {inv.amount} (förfaller {inv.due_date})
          </option>
        ))}
      </select>

      {selectedInvoice && (
        <div className="bg-blue-50 dark:bg-blue-900 rounded-xl p-8">
          <p><strong>Belopp:</strong> {selectedInvoice.amount}</p>
          <p><strong>Aktuellt förfallodatum:</strong> {selectedInvoice.due_date}</p>

          <label className="block mt-6">
            <span className="text-lg">Förlängning (dagar):</span>
            <input type="range" min="15" max="90" step="15" value={extensionDays} onChange={(e) => setExtensionDays(Number(e.target.value))} className="w-full mt-2" />
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

          <button className="mt-8 bg-green-600 text-white px-8 py-4 rounded text-lg">
            Signera med BankID (mock)
          </button>
        </div>
      )}
    </div>
  );
}