'use client';

import { format } from 'date-fns';
import { Invoice } from '@/types/invoice';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Samma mock-data som i invoices för konsistens
const mockInvoices: Invoice[] = [
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

export default function AnalyticsPage() {
  const totalPaid = mockInvoices
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + (inv.payout_amount || 0), 0);

  const totalInvoices = mockInvoices.length;

  const avgFee = mockInvoices
    .filter(inv => inv.payout_amount)
    .reduce((sum, inv) => sum + (inv.amount - (inv.payout_amount || 0)), 0) / mockInvoices.filter(inv => inv.payout_amount).length || 0;

  // Månadsdata för grafer
  const monthlyData = mockInvoices.reduce((acc, inv) => {
    const month = format(new Date(inv.created_at), 'yyyy-MM');
    const existing = acc.find(item => item.month === month);
    if (existing) {
      existing.count += 1;
      if (inv.payout_amount) existing.paid += inv.payout_amount;
    } else {
      acc.push({ month, count: 1, paid: inv.payout_amount || 0 });
    }
    return acc;
  }, [] as { month: string; count: number; paid: number }[]);

  const pieData = [
    { name: 'Utbetalda', value: mockInvoices.filter(i => i.status === 'paid').length },
    { name: 'Godkända', value: mockInvoices.filter(i => i.status === 'approved').length },
    { name: 'Väntande', value: mockInvoices.filter(i => i.status === 'pending').length },
  ];

  const COLORS = ['#22c55e', '#eab308', '#6b7280'];

  const exportCSV = () => {
    const headers = ['Fakturanummer', 'Leverantör', 'Belopp', 'Status', 'Utbetalt belopp', 'Utbetalningsdatum'];
    const rows = mockInvoices.map(inv => [
      inv.invoice_number,
      inv.supplier,
      inv.amount,
      inv.status,
      inv.payout_amount || '',
      inv.payout_date || '',
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'fortus_kopstatistik.csv';
    link.click();
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Köpstatistik</h1>
        <Button onClick={exportCSV}>
          <Download className="w-4 h-4 mr-2" />
          Exportera till CSV
        </Button>
      </div>

      {/* KPI-kort */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card>
          <CardHeader>
            <CardTitle>Totalt utbetalt</CardTitle>
            <CardDescription>Pengar ni fått från Fortus</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-green-600">{totalPaid.toLocaleString('sv-SE')} kr</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Antal köpta fakturor</CardTitle>
            <CardDescription>Totalt antal hanterade fakturor</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalInvoices}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Genomsnittlig avgift</CardTitle>
            <CardDescription>Per utbetald faktura</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{avgFee.toFixed(0)} kr</p>
          </CardContent>
        </Card>
      </div>

      {/* Grafer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Utbetalt per månad</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: number) => value != null ? `${value.toLocaleString('sv-SE')} kr` : '0 kr'} />
                <Legend />
                <Line type="monotone" dataKey="paid" stroke="#2563eb" strokeWidth={3} name="Utbetalt (kr)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Antal fakturor per månad</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Statusfördelning</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value} st`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
