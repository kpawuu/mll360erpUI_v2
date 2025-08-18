import { apiClient } from '../api-client'
import type { InvoiceLineItem, CreateInvoiceLineItem, UpdateInvoiceLineItem } from '../models/invoice-line-items.model'

const servicePath = 'crm/invoice_line_items'

export const invoiceLineItemsController = {
  async find(params?: any): Promise<{ data: InvoiceLineItem[]; total: number }> {
    const response = await apiClient.service(servicePath).find(params)
    return response
  },

  async get(id: number, params?: any): Promise<InvoiceLineItem> {
    return await apiClient.service(servicePath).get(id, params)
  },

  async create(data: CreateInvoiceLineItem, params?: any): Promise<InvoiceLineItem> {
    return await apiClient.service(servicePath).create(data, params)
  },

  async patch(id: number, data: UpdateInvoiceLineItem, params?: any): Promise<InvoiceLineItem> {
    return await apiClient.service(servicePath).patch(id, data, params)
  },

  async remove(id: number, params?: any): Promise<InvoiceLineItem> {
    return await apiClient.service(servicePath).remove(id, params)
  },

  async findByInvoiceId(invoiceId: number): Promise<InvoiceLineItem[]> {
    const response = await apiClient.service(servicePath).find({
      query: {
        invoice_id: invoiceId
      }
    })
    return response.data
  }
}
