import type { SalesOrderLine } from './sales-order-line.model'

export type SalesOrderStatus =
  | 'draft'
  | 'confirmed'
  | 'in_fulfillment'
  | 'partially_shipped'
  | 'shipped'
  | 'delivered'
  | 'cancelled'

export interface SalesOrder {
  id: number
  company_id: number
  opportunity_id?: number
  entity_id: number
  contact_id?: number
  order_number: string
  status: SalesOrderStatus
  order_date: string
  requested_delivery_date?: string
  currency_id: number
  total_amount: number
  owner_id?: number
  notes?: string
  customer_po_number?: string
  delivery_instructions?: string
  date_created: string
  date_updated?: string
  entity?: { id: number; name: string }
  contact?: { id: number; name: string; email_address?: string }
  currency?: { id: number; currency_code: string; symbol: string }
  owner?: { id: number; first_name: string; last_name: string }
  company?: { id: number; name: string }
  opportunity?: { id: number; title: string; company_name: string }
  line_items?: SalesOrderLine[]
}

export interface CreateSalesOrder {
  company_id?: number
  opportunity_id?: number
  entity_id: number
  contact_id?: number
  order_number?: string
  status?: SalesOrderStatus
  order_date: string
  requested_delivery_date?: string
  currency_id: number
  total_amount?: number
  owner_id?: number
  notes?: string
  customer_po_number?: string
  delivery_instructions?: string
}

export interface UpdateSalesOrder {
  opportunity_id?: number
  entity_id?: number
  contact_id?: number
  order_number?: string
  status?: SalesOrderStatus
  order_date?: string
  requested_delivery_date?: string
  currency_id?: number
  total_amount?: number
  owner_id?: number
  notes?: string
  customer_po_number?: string
  delivery_instructions?: string
}
