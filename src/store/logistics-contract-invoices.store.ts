import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { logisticsContractInvoicesControllers } from '../api/controllers/logistics-contract-invoices.controllers'
import type { LogisticsContractInvoice, CreateLogisticsContractInvoice, UpdateLogisticsContractInvoice } from '../api/models/logistics-contract-invoices.model'

export const useLogisticsContractInvoicesStore = defineStore('logisticsContractInvoices', () => {
  // State
  const invoices = ref<LogisticsContractInvoice[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const pagination = ref({
    total: 0,
    limit: 20,
    skip: 0,
    currentPage: 1
  })

  // Getters
  const getInvoices = computed(() => invoices.value)
  const getLoading = computed(() => loading.value)
  const getError = computed(() => error.value)
  const getPagination = computed(() => pagination.value)

  // Get total pages
  const getTotalPages = computed(() => {
    return Math.ceil(pagination.value.total / pagination.value.limit)
  })

  // Get invoices by opportunity
  const getInvoicesByOpportunity = computed(() => {
    return (opportunityId: number) => invoices.value.filter(invoice => invoice.opportunity_id === opportunityId)
  })

  // Get invoices by status
  const getInvoicesByStatus = computed(() => {
    return (status: string) => invoices.value.filter(invoice => invoice.status === status)
  })

  // Get overdue invoices
  const getOverdueInvoices = computed(() => {
    const today = new Date()
    return invoices.value.filter(invoice => {
      if (invoice.status === 'paid' || invoice.status === 'cancelled') {
        return false
      }
      return new Date(invoice.due_date) < today
    })
  })

  // Get total outstanding amount
  const getTotalOutstanding = computed(() => {
    return invoices.value.reduce((total, invoice) => {
      if (invoice.status !== 'paid' && invoice.status !== 'cancelled') {
        return total + (invoice.total_amount - (invoice.paid_amount || 0))
      }
      return total
    }, 0)
  })

  // Actions
  const fetchInvoices = async (params?: { query?: any }) => {
    loading.value = true
    error.value = null

    try {
      const response = await logisticsContractInvoicesControllers.getLogisticsContractInvoices(params)
      invoices.value = response.data || []
      pagination.value = {
        total: response.total || 0,
        limit: response.limit || 20,
        skip: response.skip || 0,
        currentPage: Math.floor((response.skip || 0) / (response.limit || 20)) + 1
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch invoices'
      console.error('Error fetching logistics contract invoices:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchInvoice = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      const response = await logisticsContractInvoicesControllers.getLogisticsContractInvoice(id)
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch invoice'
      console.error('Error fetching logistics contract invoice:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const createInvoice = async (data: CreateLogisticsContractInvoice) => {
    loading.value = true
    error.value = null

    try {
      const response = await logisticsContractInvoicesControllers.createLogisticsContractInvoice(data)
      
      // Add to local state
      invoices.value.unshift(response)
      
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to create invoice'
      console.error('Error creating logistics contract invoice:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateInvoice = async (id: number, data: UpdateLogisticsContractInvoice) => {
    loading.value = true
    error.value = null

    try {
      const response = await logisticsContractInvoicesControllers.updateLogisticsContractInvoice(id, data)
      
      // Update in local state
      const index = invoices.value.findIndex(i => i.id === id)
      if (index !== -1) {
        invoices.value[index] = response
      }
      
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to update invoice'
      console.error('Error updating logistics contract invoice:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteInvoice = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      await logisticsContractInvoicesControllers.deleteLogisticsContractInvoice(id)
      
      // Remove from local state
      invoices.value = invoices.value.filter(i => i.id !== id)
    } catch (err: any) {
      error.value = err.message || 'Failed to delete invoice'
      console.error('Error deleting logistics contract invoice:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const generateInvoice = async (data: {
    opportunity_id: number
    invoice_date?: Date
    due_date?: Date
    notes?: string
    user_id: number
  }) => {
    loading.value = true
    error.value = null

    try {
      const response = await logisticsContractInvoicesControllers.generateInvoice(data)
      
      // Add to local state
      invoices.value.unshift(response)
      
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to generate invoice'
      console.error('Error generating invoice:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateInvoiceStatus = async (id: number, status: string, user_id: number) => {
    loading.value = true
    error.value = null

    try {
      const response = await logisticsContractInvoicesControllers.updateInvoiceStatus(id, status, user_id)
      
      // Update in local state
      const index = invoices.value.findIndex(i => i.id === id)
      if (index !== -1) {
        invoices.value[index] = response
      }
      
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to update invoice status'
      console.error('Error updating invoice status:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const recordPayment = async (id: number, paymentData: {
    amount: number
    payment_date: Date
    payment_method: string
    reference_number?: string
    notes?: string
    user_id: number
  }) => {
    loading.value = true
    error.value = null

    try {
      const response = await logisticsContractInvoicesControllers.recordPayment(id, paymentData)
      
      // Update in local state
      const index = invoices.value.findIndex(i => i.id === id)
      if (index !== -1) {
        invoices.value[index] = response
      }
      
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to record payment'
      console.error('Error recording payment:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const getInvoiceStatistics = async (params: any = {}) => {
    loading.value = true
    error.value = null

    try {
      const response = await logisticsContractInvoicesControllers.getInvoiceStatistics(params)
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch invoice statistics'
      console.error('Error fetching invoice statistics:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const sendInvoice = async (id: number, user_id: number) => {
    loading.value = true
    error.value = null

    try {
      const response = await logisticsContractInvoicesControllers.sendInvoice(id, user_id)
      
      // Update in local state
      const index = invoices.value.findIndex(i => i.id === id)
      if (index !== -1) {
        invoices.value[index] = response
      }
      
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to send invoice'
      console.error('Error sending invoice:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchOverdueInvoices = async (params: any = {}) => {
    loading.value = true
    error.value = null

    try {
      const response = await logisticsContractInvoicesControllers.getOverdueInvoices(params)
      return response.data || response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch overdue invoices'
      console.error('Error fetching overdue invoices:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const bulkUpdateInvoiceStatus = async (ids: number[], status: string, user_id: number) => {
    loading.value = true
    error.value = null

    try {
      const response = await logisticsContractInvoicesControllers.bulkUpdateInvoiceStatus(ids, status, user_id)
      
      // Update invoices in local state
      for (const result of response) {
        if (result.success) {
          const index = invoices.value.findIndex(i => i.id === result.id)
          if (index !== -1) {
            invoices.value[index] = result.result
          }
        }
      }
      
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to bulk update invoice statuses'
      console.error('Error bulk updating invoice statuses:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Pagination actions
  const setPage = (page: number) => {
    pagination.value.currentPage = page
    pagination.value.skip = (page - 1) * pagination.value.limit
  }

  const setLimit = (limit: number) => {
    pagination.value.limit = limit
    pagination.value.currentPage = 1
    pagination.value.skip = 0
  }

  // Error handling
  const clearError = () => {
    error.value = null
  }

  return {
    // State
    invoices,
    loading,
    error,
    pagination,

    // Getters
    getInvoices,
    getLoading,
    getError,
    getPagination,
    getTotalPages,
    getInvoicesByOpportunity,
    getInvoicesByStatus,
    getOverdueInvoices,
    getTotalOutstanding,

    // Actions
    fetchInvoices,
    fetchInvoice,
    createInvoice,
    updateInvoice,
    deleteInvoice,
    generateInvoice,
    updateInvoiceStatus,
    recordPayment,
    getInvoiceStatistics,
    sendInvoice,
    fetchOverdueInvoices,
    bulkUpdateInvoiceStatus,

    // Pagination
    setPage,
    setLimit,

    // Error handling
    clearError
  }
}, {
  persist: false
})
