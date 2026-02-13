'use client';

import { useState, useEffect } from 'react';
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
    // Dina befintliga mock-fakturor (behåll dem)
    // ... (samma som tidigare)
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) {
      setMessage({ type: 'error', text: 'Ingen fil vald – dra en PDF eller klicka för att välja' });
      return;
    }

    setUploading(true);
    setMessage(null);

    const formData = new FormData();
    acceptedFiles.forEach(file => formData.append('files', file));

    try {
      const res = await fetch('/api/extract-pdf', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || `Fel ${res.status} – försök igen`);
      }

      setMessage({ type: 'success', text: `${acceptedFiles.length} faktura(r) uppladdade och väntar på godkännande!` });

      // Lägg till ny pending-faktura från Groq-resultatet
      const newInvoices = (result.invoices || []).map((inv: any, index: number) => ({
        id: `uploaded-${Date.now()}-${index}`,
        invoice_number: inv.invoice_number || 'Okänt',
        supplier: inv.supplier || 'Okänd leverantör',
        amount: inv.total_amount || 0,
        due_date: inv.due_date || new Date().toISOString(),
        total_amount: inv.total_amount || 0,
        vat: inv.vat || 0,
        ocr_confidence: inv.ocr_confidence || 0,
        file_url: result.signed_urls?.[index] || '#',
        created_at: new Date().toISOString(),
        status: 'pending' as const,
      }));

      setInvoices(prev => [...newInvoices, ...prev]);
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Uppladdning misslyckades – kontrollera filen och försök igen' });
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'], 'image/*': [] },
    disabled: uploading,
  });

  const filteredInvoices = invoices.filter(inv =>
    (inv.invoice_number || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (inv.supplier || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status: Invoice['status']) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'approved': return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'pending': return <XCircle className="w-5 h-5 text-gray-500" />;
      default: return <XCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: Invoice['status']) => {
    switch (status) {
      case 'paid': return 'Utbetald';
      case 'approved': return 'Godkänd – utbetalning inom 24h';
      case 'pending': return 'Väntar på godkännande';
      default: return 'Väntar på godkännande';
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Fakturahantering</h1>

      {message && (
        <div className={`p-4 rounded-md mb-6 ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}

      <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer mb-8 transition ${uploading ? 'opacity-50' : 'hover:bg-gray-100'}`}>
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        {uploading ? <p className="text-lg">Bearbetar och parsar fakturor...</p> : isDragActive ? <p className="text-lg">Släpp filerna här...</p> : <p className="text-lg">Dra och släpp PDF-fakturor här, eller klicka för att välja filer</p>}
      </div>

      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Sök efter fakturanummer eller leverantör..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

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
                <td colSpan={8} className="h-32 text-center text-gray-500 py-8">
                  Inga fakturor matchar sökningen.
                </td>
              </TableRow>
            ) : (
              filteredInvoices.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="font-medium">{inv.invoice_number || 'Okänt'}</TableCell>
                  <TableCell>{inv.supplier || 'Okänt'}</TableCell>
                  <TableCell>{inv.amount ? `${inv.amount.toLocaleString('sv-SE')} kr` : '-'}</TableCell>
                  <TableCell>{inv.due_date ? format(new Date(inv.due_date), 'yyyy-MM-dd') : '-'}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(inv.status || 'pending')}
                      <span className="font-medium">{getStatusText(inv.status || 'pending')}</span>
                      {(inv.status || 'pending') === 'pending' && <Progress value={40} className="w-20 ml-4" />}
                    </div>
                  </TableCell>
                  <TableCell>{inv.payout_date ? format(new Date(inv.payout_date), 'yyyy-MM-dd HH:mm') : '-'}</TableCell>
                  <TableCell>{inv.payout_amount ? `${inv.payout_amount.toLocaleString('sv-SE')} kr` : '-'}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {inv.file_url && (
                        <Button size="sm" variant="outline" asChild>
                          <a href={inv.file_url} target="_blank" rel="noopener noreferrer">
                            <Download className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
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
