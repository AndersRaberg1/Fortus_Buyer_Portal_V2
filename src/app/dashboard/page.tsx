'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import CreditCard from '@/components/CreditCard';
import CashFlowChart from '@/components/CashFlowChart';
import { useRouter } from 'next/navigation';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Dashboard() {
  const [totalDue, setTotalDue] = useState(0);
  const [invoiceCount, setInvoiceCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchSummary = async () => {
      const { data } = await supabase.from('invoices').select('amount');
      if (data) {
        const sum = data.reduce((acc, inv) => acc + parseFloat(inv.amount.replace(' kr', '') || 0), 0);
        setTotalDue(sum);
        setInvoiceCount(data.length);
      }
    };
    fetchSummary();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Välkommen till Fortus Buyer Portal</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <CreditCard />
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Sammanfattning</h2>
          <p><strong>Antal fakturor:</strong> {invoiceCount}</p>
          <p><strong>Totalt att betala:</strong> {totalDue.toFixed(2)} kr</p>
          <button onClick={() => router.push('/invoices')} className="mt-6 bg-blue-600 text-white px-6 py-3 rounded">
            Ladda upp eller hantera fakturor
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Cash flow (placeholder)</h2>
        <CashFlowChart />
      </div>
    </div>
  );
}