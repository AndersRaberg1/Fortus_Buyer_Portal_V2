export type Invoice = {
  id: string;
  invoice_number: string;
  supplier: string;
  amount: number;
  due_date: string;
  total_amount: number;
  vat: number;
  ocr_confidence: number;
  file_url: string;
  created_at: string;
  // Nya fält för status och utbetalning
  status: 'pending' | 'approved' | 'paid';
  payout_date?: string;
  payout_amount?: number;
};
