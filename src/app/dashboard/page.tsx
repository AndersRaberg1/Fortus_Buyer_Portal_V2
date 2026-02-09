'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import CreditCard from '@/components/CreditCard';
import CashFlowChart from '@/components/CashFlowChart';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Dashboard() {
  const [summary, setSummary] = useState({ count: 0, total: 0 });

  useEffect(() => {
    const fetchSummary = async () => {
      const { data } = await supabase.from('invoices').select('amount');
      if (data) {
        const total = data.reduce((acc, inv) => acc + parseFloat(inv.amount.replace(' kr', '') || 0), 0);
        setSummary({ count: data.length, total });
      }
    };
    fetchSummary();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Välkommen till Fortus Buyer Portal</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <CreditCard />
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Fakturaöversikt</h2>
          <p><strong>Antal fakturor:</strong> {summary.count}</p>
          <p><strong>Totalt att betala:</strong> {summary.total.toFixed(2)} kr</p>
          <Link href="/invoices" className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded">
            Hantera fakturor
          </Link>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">FortusFlex</h2>
          <p>Förläng betalningstid mot avgift</p>
          <Link href="/fortusflex" className="mt-6 inline-block bg-green-600 text-white px-6 py-3 rounded">
            Beräkna förlängning
          </Link>
        </div>
      </div>

      <CashFlowChart />
    </div>
  );
}