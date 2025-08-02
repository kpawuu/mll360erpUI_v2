import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { shipmentControllers } from '../api/controllers/shipment.controllers'
import type { Shipment, CreateShipment, UpdateShipment } from '../api/models/shipment.model'

export const useShipmentStore = defineStore('shipment', () => {
  // State
  const shipments = ref<Shipment[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const pagination = ref({
    total: 0,
    limit: 10,
    skip: 0,
    currentPage: 1
  })

  // Getters
  const getShipments = computed(() => shipments.value)
  const getLoading = computed(() => loading.value)
  const getError = computed(() => error.value)
  const getPagination = computed(() => pagination.value)

  // Actions
  const fetchShipments = async (params?: { query?: any }) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await shipmentControllers.getShipments(params)
      
      if (response && response.data) {
        shipments.value = response.data
        pagination.value = {
          total: response.total || 0,
          limit: response.limit || 10,
          skip: response.skip || 0,
          currentPage: Math.floor((response.skip || 0) / (response.limit || 10)) + 1
        }
      } else if (Array.isArray(response)) {
        shipments.value = response
        pagination.value = {
          total: response.length,
          limit: response.length,
          skip: 0,
          currentPage: 1
        }
      } else {
        shipments.value = []
        pagination.value = {
          total: 0,
          limit: 10,
          skip: 0,
          currentPage: 1
        }
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch shipments'
      handleAuthError(err)
    } finally {
      loading.value = false
    }
  }

  const fetchShipment = async (id: number) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await shipmentControllers.getShipment(id)
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch shipment'
      handleAuthError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const createShipment = async (shipmentData: CreateShipment) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await shipmentControllers.createShipment(shipmentData)
      await fetchShipments() // Refresh the list
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to create shipment'
      handleAuthError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateShipment = async (id: number, shipmentData: UpdateShipment) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await shipmentControllers.updateShipment(id, shipmentData)
      await fetchShipments() // Refresh the list
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to update shipment'
      handleAuthError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteShipment = async (id: number) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await shipmentControllers.deleteShipment(id)
      await fetchShipments() // Refresh the list
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to delete shipment'
      handleAuthError(err)
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

  const handleAuthError = (err: any) => {
    if (err.message?.includes('Authentication') || err.message?.includes('401')) {
      console.error('Authentication error:', err)
    }
  }

  return {
    // State
    shipments,
    loading,
    error,
    pagination,
    
    // Getters
    getShipments,
    getLoading,
    getError,
    getPagination,
    
    // Actions
    fetchShipments,
    fetchShipment,
    createShipment,
    updateShipment,
    deleteShipment,
    setPage,
    setLimit,
    clearError
  }
}, {
  persist: true
}) 