'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Invoice } from '@/types/invoice';
import { Upload, Search, Download, Trash2, Info, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { useDropzone } from 'react-dropzone';

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([
    // Mock-data med nya fält
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
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredInvoices = invoices.filter(inv =>
    inv.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onDrop = async (acceptedFiles: File[]) => {
    // Här kopplar du senare till er /api/extract-pdf
    console.log('Uppladdade filer:', acceptedFiles);
    // TODO: Lägg till fetch till API-routen och uppdatera invoices-state
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': [], 'image/*': [] },
  });

  const getStatusIcon = (status: Invoice['status']) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'approved': return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'pending': return <XCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: Invoice['status']) => {
    switch (status) {
      case 'paid': return 'Utbetald';
      case 'approved': return 'Godkänd – utbetalning inom 24h';
      case 'pending': return 'Väntar på godkännande';
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Fakturahantering</h1>

      {/* Dropzone */}
      <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer mb-8 bg-gray-50 hover:bg-gray-100 transition">
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        {isDragActive ? <p className="text-lg">Släpp filerna här...</p> : <p className="text-lg">Dra och släpp PDF-fakturor här, eller klicka för att välja filer</p>}
      </div>

      {/* Sökfält */}
      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Sök efter fakturanummer eller leverantör..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Tabell */}
      <TooltipProvider>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fakturanummer</TableHead>
              <TableHead>Leverantör</TableHead>
              <TableHead>Belopp</TableHead>
              <TableHead>Förfallodatum</TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  Status
                  <Tooltip>
                    <TooltipTrigger><Info className="w-4 h-4 text-gray-500" /></TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      Pengar utbetalas inom 24 timmar efter godkännande. Vi tar över kreditrisken.
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TableHead>
              <TableHead>Utbetalningsdatum</TableHead>
              <TableHead>Utbetalt belopp</TableHead>
              <TableHead>Åtgärder</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.length === 0 ? (
              <TableRow>
                <td colSpan={8} className="p-4 align-middle text-center text-gray-500 h-32">
                  Inga fakturor matchar sökningen.
                </td>
              </TableRow>
            ) : (
              filteredInvoices.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="font-medium">{inv.invoice_number}</TableCell>
                  <TableCell>{inv.supplier}</TableCell>
                  <TableCell>{inv.amount.toLocaleString('sv-SE')} kr</TableCell>
                  <TableCell>{format(new Date(inv.due_date), 'yyyy-MM-dd')}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(inv.status)}
                      <span className="font-medium">{getStatusText(inv.status)}</span>
                      {inv.status === 'pending' && <Progress value={40} className="w-20 ml-4" />}
                    </div>
                  </TableCell>
                  <TableCell>
                    {inv.payout_date ? format(new Date(inv.payout_date), 'yyyy-MM-dd HH:mm') : '-'}
                  </TableCell>
                  <TableCell>
                    {inv.payout_amount ? `${inv.payout_amount.toLocaleString('sv-SE')} kr` : '-'}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <a href={inv.file_url} target="_blank" rel="noopener noreferrer">
                          <Download className="w-4 h-4" />
                        </a>
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setInvoices(invoices.filter(i => i.id !== inv.id))}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TooltipProvider>
    </div>
  );
}
