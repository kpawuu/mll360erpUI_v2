import feathersClient from '../feathers'
import type { CreateLogisticsContractInvoice, UpdateLogisticsContractInvoice } from '../models/logistics-contract-invoices.model'

export const logisticsContractInvoicesControllers = {
  // Get all invoices with optional query parameters
  async getLogisticsContractInvoices(params?: { query?: any }) {
    try {
      const response = await feathersClient.service('logistics-contract-invoices').find(params)
      return response
    } catch (error) {
      console.error('Error fetching logistics contract invoices:', error)
      throw error
    }
  },

  // Get a single invoice by ID
  async getLogisticsContractInvoice(id: number) {
    try {
      const response = await feathersClient.service('logistics-contract-invoices').get(id)
      return response
    } catch (error) {
      console.error('Error fetching logistics contract invoice:', error)
      throw error
    }
  },

  // Create a new invoice
  async createLogisticsContractInvoice(data: CreateLogisticsContractInvoice) {
    try {
      const response = await feathersClient.service('logistics-contract-invoices').create(data)
      return response
    } catch (error) {
      console.error('Error creating logistics contract invoice:', error)
      throw error
    }
  },

  // Update an existing invoice
  async updateLogisticsContractInvoice(id: number, data: UpdateLogisticsContractInvoice) {
    try {
      const response = await feathersClient.service('logistics-contract-invoices').patch(id, data)
      return response
    } catch (error) {
      console.error('Error updating logistics contract invoice:', error)
      throw error
    }
  },

  // Delete an invoice
  async deleteLogisticsContractInvoice(id: number) {
    try {
      const response = await feathersClient.service('logistics-contract-invoices').remove(id)
      return response
    } catch (error) {
      console.error('Error deleting logistics contract invoice:', error)
      throw error
    }
  },

  // Generate invoice from opportunity and rates
  async generateInvoice(data: {
    opportunity_id: number
    invoice_date?: Date
    due_date?: Date
    notes?: string
    user_id: number
    total_amount?: number
    currency_id?: number
  }) {
    try {
      // Convert Date objects to YYYY-MM-DD format
      const formatDate = (date: Date | undefined) => {
        if (!date) return undefined
        return date.toISOString().split('T')[0]
      }

      // Get user data to get company_id
      if (!data.user_id || data.user_id === 0) {
        throw new Error('Invalid user ID provided for invoice generation')
      }
      
      console.log('Generating invoice for user ID:', data.user_id)
      const userResponse = await feathersClient.service('users').get(data.user_id)
      console.log('User response:', userResponse)
      const companyId = userResponse?.company_id || 1

      const response = await feathersClient.service('logistics-contract-invoices').create({
        opportunity_id: data.opportunity_id,
        company_id: companyId, // Explicitly set company_id
        invoice_date: formatDate(data.invoice_date),
        due_date: formatDate(data.due_date),
        notes: data.notes,
        created_by: data.user_id,
        total_amount: Number(data.total_amount) || 0,
        currency_id: Number(data.currency_id) || 1,
        status: 'draft',
        paid_amount: 0,
        invoice_number: `INV-${Date.now()}` // Generate a temporary invoice number
      })
      return response
    } catch (error) {
      console.error('Error generating invoice:', error)
      throw error
    }
  },

  // Update invoice
  async patch(id: number, data: any) {
    try {
      const response = await feathersClient.service('logistics-contract-invoices').patch(id, data)
      return response
    } catch (error) {
      console.error('Error updating invoice:', error)
      throw error
    }
  },

  // Update invoice status
  async updateInvoiceStatus(id: number, status: string, user_id: number) {
    try {
      const response = await feathersClient.service('logistics-contract-invoices').patch(id, {
        status,
        updated_by: user_id,
        method: 'updateStatus'
      })
      return response
    } catch (error) {
      console.error('Error updating invoice status:', error)
      throw error
    }
  },

  // Record payment for invoice
  async recordPayment(id: number, paymentData: {
    amount: number
    payment_date: Date
    payment_method: string
    reference_number?: string
    notes?: string
    user_id: number
  }) {
    try {
      const response = await feathersClient.service('logistics-contract-invoices').patch(id, {
        ...paymentData,
        method: 'recordPayment'
      })
      return response
    } catch (error) {
      console.error('Error recording payment:', error)
      throw error
    }
  },

  // Get invoice statistics
  async getInvoiceStatistics(params: any = {}) {
    try {
      const response = await feathersClient.service('logistics-contract-invoices').find({
        ...params,
        method: 'getStatistics'
      })
      return response
    } catch (error) {
      console.error('Error fetching invoice statistics:', error)
      throw error
    }
  },

  // Send invoice
  async sendInvoice(id: number, user_id: number) {
    try {
      const response = await feathersClient.service('logistics-contract-invoices').patch(id, {
        user_id,
        method: 'sendInvoice'
      })
      return response
    } catch (error) {
      console.error('Error sending invoice:', error)
      throw error
    }
  },

  // Get overdue invoices
  async getOverdueInvoices(params: any = {}) {
    try {
      const response = await feathersClient.service('logistics-contract-invoices').find({
        ...params,
        method: 'getOverdueInvoices'
      })
      return response
    } catch (error) {
      console.error('Error fetching overdue invoices:', error)
      throw error
    }
  },

  // Bulk update invoice statuses
  async bulkUpdateInvoiceStatus(ids: number[], status: string, user_id: number) {
    try {
      const response = await feathersClient.service('logistics-contract-invoices').create({
        ids,
        status,
        user_id,
        method: 'bulkUpdateStatus'
      })
      return response
    } catch (error) {
      console.error('Error bulk updating invoice statuses:', error)
      throw error
    }
  }
}
