'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Invoice } from '@/types/invoice';
import { format } from 'date-fns';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, DollarSign, TrendingUp } from 'lucide-react';

// Återanvänd mock-data
const mockInvoices: Invoice[] = [
  // Samma som i invoices/analytics...
  {
    id: '1',
    invoice_number: 'INV-2025-001',
    supplier: 'Leverantör AB',
    amount: 125000,
    due_date: '2026-03-15',
    total_amount: 125000,
    vat: 25000,
    ocr_confidence: 98.5,
    file_url: '/mock/inv1.pdf',
    created_at: '2026-02-01T10:00:00Z',
    status: 'paid',
    payout_date: '2026-02-02T14:30:00Z',
    payout_amount: 123750,
  },
  {
    id: '2',
    invoice_number: 'INV-2025-002',
    supplier: 'Tjänster Sverige AB',
    amount: 87500,
    due_date: '2026-02-28',
    total_amount: 87500,
    vat: 17500,
    ocr_confidence: 96.2,
    file_url: '/mock/inv2.pdf',
    created_at: '2026-02-10T09:15:00Z',
    status: 'approved',
    payout_amount: 86625,
  },
  {
    id: '3',
    invoice_number: 'INV-2025-003',
    supplier: 'Materialbolaget',
    amount: 56250,
    due_date: '2026-04-01',
    total_amount: 56250,
    vat: 11250,
    ocr_confidence: 99.1,
    file_url: '/mock/inv3.pdf',
    created_at: '2026-02-11T14:20:00Z',
    status: 'pending',
  },
];

export default function DashboardPage() {
  const totalPaid = mockInvoices
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + (inv.payout_amount || 0), 0);

  const pendingCount = mockInvoices.filter(inv => inv.status === 'pending').length;
  const approvedCount = mockInvoices.filter(inv => inv.status === 'approved').length;

  const latestInvoices = mockInvoices.slice(0, 3);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Välkommen till Fortus Buyer Portal</h1>

      {/* KPI-kort */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Totalt utbetalt</CardTitle>
            <DollarSign className="w-8 h-8 text-green-600" />
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalPaid.toLocaleString('sv-SE')} kr</p>
            <p className="text-sm text-gray-600 mt-2">Från köpta fakturor</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Väntande godkännande</CardTitle>
            <FileText className="w-8 h-8 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{pendingCount} st</p>
            <p className="text-sm text-gray-600 mt-2">Redo för utbetalning</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Godkända (snart utbetalda)</CardTitle>
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{approvedCount} st</p>
            <p className="text-sm text-gray-600 mt-2">Utbetalning inom 24h</p>
          </CardContent>
        </Card>
      </div>

      {/* Senaste fakturor */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Senaste fakturor</CardTitle>
          <CardDescription>Dina nyligen uppladdade/köpta fakturor</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {latestInvoices.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between py-4 border-b last:border-0">
                <div>
                  <p className="font-medium">{inv.invoice_number} – {inv.supplier}</p>
                  <p className="text-sm text-gray-600">{inv.amount.toLocaleString('sv-SE')} kr – Förfaller {format(new Date(inv.due_date), 'yyyy-MM-dd')}</p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/invoices">
                    Visa <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sälj ny faktura</CardTitle>
          </CardHeader>
          <CardContent>
            <Button asChild size="lg" className="w-full">
              <Link href="/invoices">Ladda upp faktura</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Beräkna FortusFlex</CardTitle>
          </CardHeader>
          <CardContent>
            <Button asChild size="lg" variant="outline" className="w-full">
              <Link href="/fortusflex">Gå till kalkylator</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
