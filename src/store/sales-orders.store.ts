import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { salesOrdersControllers } from '../api/controllers/sales-orders.controllers'
import type {
  SalesOrder,
  CreateSalesOrder,
  UpdateSalesOrder
} from '../api/models/sales-order.model'

export const useSalesOrdersStore = defineStore('salesOrders', () => {
  const salesOrders = ref<SalesOrder[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const pagination = ref({
    total: 0,
    limit: 10,
    skip: 0,
    currentPage: 1
  })

  const getSalesOrders = computed(() => salesOrders.value)
  const getLoading = computed(() => loading.value)
  const getError = computed(() => error.value)
  const getPagination = computed(() => pagination.value)

  const fetchSalesOrders = async (params?: { query?: any }) => {
    loading.value = true
    error.value = null
    try {
      const response = await salesOrdersControllers.getSalesOrders(params)
      if (response && response.data) {
        salesOrders.value = response.data
        pagination.value = {
          total: response.total || 0,
          limit: response.limit || 10,
          skip: response.skip || 0,
          currentPage: Math.floor((response.skip || 0) / (response.limit || 10)) + 1
        }
      } else {
        salesOrders.value = []
        pagination.value = { total: 0, limit: 10, skip: 0, currentPage: 1 }
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch orders'
      handleAuthError(err)
    } finally {
      loading.value = false
    }
  }

  const fetchSalesOrder = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      const response = await salesOrdersControllers.getSalesOrder(id)
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch order'
      handleAuthError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const createSalesOrder = async (data: CreateSalesOrder) => {
    loading.value = true
    error.value = null
    try {
      const response = await salesOrdersControllers.createSalesOrder(data)
      await fetchSalesOrders()
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to create order'
      handleAuthError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateSalesOrder = async (id: number, data: UpdateSalesOrder) => {
    loading.value = true
    error.value = null
    try {
      const response = await salesOrdersControllers.updateSalesOrder(id, data)
      await fetchSalesOrders()
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to update order'
      handleAuthError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const removeSalesOrder = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      await salesOrdersControllers.removeSalesOrder(id)
      await fetchSalesOrders()
    } catch (err: any) {
      error.value = err.message || 'Failed to delete order'
      handleAuthError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const setPage = (page: number) => {
    pagination.value.currentPage = page
    pagination.value.skip = (page - 1) * pagination.value.limit
  }

  const setLimit = (limit: number) => {
    pagination.value.limit = limit
    pagination.value.currentPage = 1
    pagination.value.skip = 0
  }

  const clearError = () => {
    error.value = null
  }

  const handleAuthError = (err: any) => {
    if (err.message?.includes('Authentication') || err.message?.includes('401')) {
      console.error('Authentication error:', err)
    }
  }

  return {
    salesOrders,
    loading,
    error,
    pagination,
    getSalesOrders,
    getLoading,
    getError,
    getPagination,
    fetchSalesOrders,
    fetchSalesOrder,
    createSalesOrder,
    updateSalesOrder,
    removeSalesOrder,
    setPage,
    setLimit,
    clearError
  }
})
