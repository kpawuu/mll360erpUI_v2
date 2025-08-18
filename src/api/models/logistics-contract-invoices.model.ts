import type { InvoiceLineItem } from './invoice-line-items.model'

export interface LogisticsContractInvoice {
  id: number
  opportunity_id: number
  company_id: number
  invoice_number: string
  invoice_date: string
  due_date: string
  total_amount: number
  paid_amount?: number
  currency_id: number
  status: string
  payment_method?: string
  payment_date?: string
  reference_number?: string
  notes?: string
  payment_notes?: string
  invoice_items?: string
  line_items?: InvoiceLineItem[]
  created_by?: number
  updated_by?: number
  created_at: string
  updated_at: string
}

export interface CreateLogisticsContractInvoice {
  opportunity_id: number
  company_id?: number
  invoice_number?: string
  invoice_date: string
  due_date?: string
  total_amount: number
  paid_amount?: number
  currency_id: number
  status?: string
  payment_method?: string
  payment_date?: string
  reference_number?: string
  notes?: string
  payment_notes?: string
  invoice_items?: string
  line_items?: Omit<InvoiceLineItem, 'id' | 'invoice_id' | 'created_at' | 'updated_at'>[]
}

export interface UpdateLogisticsContractInvoice {
  opportunity_id?: number
  company_id?: number
  invoice_number?: string
  invoice_date?: string
  due_date?: string
  total_amount?: number
  paid_amount?: number
  currency_id?: number
  status?: string
  payment_method?: string
  payment_date?: string
  reference_number?: string
  notes?: string
  payment_notes?: string
  invoice_items?: string
  line_items?: Omit<InvoiceLineItem, 'id' | 'invoice_id' | 'created_at' | 'updated_at'>[]
}
