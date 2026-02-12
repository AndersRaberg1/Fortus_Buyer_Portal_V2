'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { createClient } from '@supabase/supabase-js';
import { Invoice } from '@/types/invoice';
import { Upload, Search, Download, Trash2, Info, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { useDropzone } from 'react-dropzone';

// Supabase client (frontend – använd anon key)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

// Mock-data som fallback
const mockInvoices: Invoice[] = [ /* samma som tidigare – behåll dina befintliga */ ];

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch fakturor från Supabase (eller mock)
  const loadInvoices = async () => {
    setLoading(true);
    setError(null);
    if (supabase) {
      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        setError('Kunde inte hämta fakturor från Supabase');
        setInvoices(mockInvoices);
      } else {
        // Sätt pending om status saknas (nya fakturor)
        const processed = (data || []).map((inv: any) => ({
          ...inv,
          status: inv.status || 'pending',
        }));
        setInvoices(processed);
      }
    } else {
      setInvoices(mockInvoices);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadInvoices();
  }, []);

  // Uppladdning + OCR + spara
  const onDrop = async (acceptedFiles: File[]) => {
    if (!supabase) {
      alert('Supabase inte konfigurerat – använder mock');
      return;
    }
    if (acceptedFiles.length === 0) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    acceptedFiles.forEach(file => formData.append('files', file));

    try {
      const res = await fetch('/api/extract-pdf', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Uppladdning misslyckades');

      // Refetch för att få nya fakturor (med pending status)
      await loadInvoices();
    } catch (err: any) {
      setError(err.message || 'Fel vid uppladdning');
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': [], 'image/*': [] },
    disabled: uploading,
  });

  const filteredInvoices = invoices.filter(inv =>
    inv.invoice_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.supplier?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer mb-8 transition ${uploading ? 'opacity-50' : 'hover:bg-gray-100'}`}>
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        {uploading ? <p className="text-lg">Bearbetar filer...</p> : isDragActive ? <p className="text-lg">Släpp filerna här...</p> : <p className="text-lg">Dra och släpp PDF-fakturor här, eller klicka för att välja filer</p>}
      </div>

      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Sök efter fakturanummer eller leverantör..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {loading ? (
        <p>Laddar fakturor...</p>
      ) : (
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
                    <TableCell>
                      {inv.payout_date ? format(new Date(inv.payout_date), 'yyyy-MM-dd HH:mm') : '-'}
                    </TableCell>
                    <TableCell>
                      {inv.payout_amount ? `${inv.payout_amount.toLocaleString('sv-SE')} kr` : '-'}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {inv.file_url && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={inv.file_url} target="_blank" rel="noopener noreferrer">
                              <Download className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                        <Button size="sm" variant="outline" onClick={async () => {
                          if (supabase && inv.id) {
                            await supabase.from('invoices').delete().eq('id', inv.id);
                            loadInvoices();
                          } else {
                            setInvoices(invoices.filter(i => i.id !== inv.id));
                          }
                        }}>
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
      )}
    </div>
  );
}
