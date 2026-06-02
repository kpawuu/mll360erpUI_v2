export interface SalesOrderLine {
  id: number
  sales_order_id: number
  line_number: number
  description: string
  quantity: number
  unit: string
  unit_price: number
  total_amount: number
  currency_id: number
  quantity_allocated?: number
  quantity_shipped?: number
  shipment_id?: number
  date_created: string
  date_updated?: string
  currency?: { id: number; currency_code: string; symbol: string }
}

export interface CreateSalesOrderLine {
  sales_order_id: number
  line_number: number
  description: string
  quantity: number
  unit?: string
  unit_price: number
  total_amount: number
  currency_id: number
  quantity_allocated?: number
  quantity_shipped?: number
  shipment_id?: number
}

export interface UpdateSalesOrderLine {
  line_number?: number
  description?: string
  quantity?: number
  unit?: string
  unit_price?: number
  total_amount?: number
  currency_id?: number
  quantity_allocated?: number
  quantity_shipped?: number
  shipment_id?: number
}
