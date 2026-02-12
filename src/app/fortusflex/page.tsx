'use client';

import { useState } from 'react';
import { format, addDays } from 'date-fns';
import { Invoice } from '@/types/invoice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info, Calculator, Calendar, DollarSign } from 'lucide-react';

// Samma mock-invoices som i andra sidor
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

export default function FortusFlexPage() {
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string>('');
  const [extraDays, setExtraDays] = useState(30);

  const selectedInvoice = mockInvoices.find(inv => inv.id === selectedInvoiceId) || null;

  // Avgift: 0.05% per extra dag (exempel – justera efter verklig modell)
  const feeRatePerDay = 0.0005; // 0.05%
  const fee = selectedInvoice ? selectedInvoice.amount * feeRatePerDay * extraDays : 0;
  const newDueDate = selectedInvoice ? addDays(new Date(selectedInvoice.due_date), extraDays) : null;
  const totalCost = selectedInvoice ? selectedInvoice.amount + fee : 0;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">Fortus Flex – Förläng betalningstiden</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger><Info className="w-6 h-6 text-gray-500" /></TooltipTrigger>
            <TooltipContent className="max-w-md">
              <p>Med Fortus Flex betalar vi din leverantör i tid – du betalar oss senare + en låg avgift. Perfekt för bättre likviditet utan att sälja hela fakturan.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Välj faktura och extra dagar</CardTitle>
          <CardDescription>Förläng betalningstiden flexibelt – vi hanterar resten</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Välj faktura med native select */}
          <div>
            <label htmlFor="invoice" className="block text-sm font-medium text-gray-700 mb-2">
              Välj faktura
            </label>
            <select
              id="invoice"
              value={selectedInvoiceId}
              onChange={(e) => setSelectedInvoiceId(e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="">Välj en faktura...</option>
              {mockInvoices.map((inv) => (
                <option key={inv.id} value={inv.id}>
                  {inv.invoice_number} – {inv.supplier} ({inv.amount.toLocaleString('sv-SE')} kr)
                </option>
              ))}
            </select>
          </div>

          {/* Slider för dagar */}
          {selectedInvoice && (
            <>
              <div>
                <label htmlFor="days" className="block text-sm font-medium text-gray-700 mb-2">
                  Extra dagar: {extraDays}
                </label>
                <input
                  type="range"
                  id="days"
                  min="30"
                  max="90"
                  step="10"
                  value={extraDays}
                  onChange={(e) => setExtraDays(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  style={{ background: `linear-gradient(to right, #2563eb 0%, #2563eb ${(extraDays - 30) / 60 * 100}%, #e5e7eb ${(extraDays - 30) / 60 * 100}%, #e5e7eb 100%)` }}
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>30 dagar</span>
                  <span>60 dagar</span>
                  <span>90 dagar</span>
                </div>
              </div>

              {/* Resultat */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <Card>
                  <CardHeader className="flex flex-row items-center gap-2 pb-2">
                    <Calendar className="w-6 h-6 text-primary" />
                    <CardTitle className="text-lg">Nytt förfallodatum</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">
                      {newDueDate ? format(newDueDate, 'yyyy-MM-dd') : '-'}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center gap-2 pb-2">
                    <DollarSign className="w-6 h-6 text-primary" />
                    <CardTitle className="text-lg">Avgift</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{fee.toFixed(0)} kr</p>
                    <p className="text-sm text-gray-600">({(feeRatePerDay * 100 * extraDays).toFixed(2)}% totalt)</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center gap-2 pb-2">
                    <Calculator className="w-6 h-6 text-primary" />
                    <CardTitle className="text-lg">Total kostnad</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{totalCost.toLocaleString('sv-SE')} kr</p>
                  </CardContent>
                </Card>
              </div>

              {/* Ansök-knapp */}
              <div className="mt-8">
                <Button size="lg" className="w-full">
                  Signera ansökan med BankID (mock)
                </Button>
                <p className="text-sm text-gray-600 text-center mt-4">
                  Vi betalar din leverantör omgående – du får {extraDays} dagar extra mot en låg avgift.
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
