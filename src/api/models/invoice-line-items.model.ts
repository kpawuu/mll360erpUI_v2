export interface InvoiceLineItem {
  id?: number
  invoice_id: number
  shipment_type: string
  description: string
  quantity: number
  unit_price: number
  total_amount: number
  currency_id: number
  rate_type: string
  service_category: string
  rate_id?: number
  notes?: string
  created_by?: number
  updated_by?: number
  created_at?: string
  updated_at?: string
  currency?: any
}

export interface CreateInvoiceLineItem {
  invoice_id: number
  shipment_type: string
  description: string
  quantity: number
  unit_price: number
  total_amount: number
  currency_id: number
  rate_type: string
  service_category: string
  rate_id?: number
  notes?: string
  created_by?: number
}

export interface UpdateInvoiceLineItem {
  invoice_id?: number
  shipment_type?: string
  description?: string
  quantity?: number
  unit_price?: number
  total_amount?: number
  currency_id?: number
  rate_type?: string
  service_category?: string
  rate_id?: number
  notes?: string
  updated_by?: number
}
