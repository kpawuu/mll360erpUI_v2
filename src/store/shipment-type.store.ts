import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { shipmentTypeControllers } from '../api/controllers/shipment-type.controllers'
import type { ShipmentType, CreateShipmentType, UpdateShipmentType } from '../api/models/shipment-type.model'

export const useShipmentTypeStore = defineStore('shipmentType', () => {
  // State
  const shipmentTypes = ref<ShipmentType[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const getShipmentTypes = computed(() => shipmentTypes.value)
  const getLoading = computed(() => loading.value)
  const getError = computed(() => error.value)

  // Actions
  const fetchShipmentTypes = async (params?: { query?: any }) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await shipmentTypeControllers.getShipmentTypes(params)
      
      if (response && response.data) {
        shipmentTypes.value = response.data
      } else if (Array.isArray(response)) {
        shipmentTypes.value = response
      } else {
        shipmentTypes.value = []
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch shipment types'
      handleAuthError(err)
    } finally {
      loading.value = false
    }
  }

  const createShipmentType = async (shipmentTypeData: CreateShipmentType) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await shipmentTypeControllers.createShipmentType(shipmentTypeData)
      await fetchShipmentTypes() // Refresh the list
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to create shipment type'
      handleAuthError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateShipmentType = async (id: number, shipmentTypeData: UpdateShipmentType) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await shipmentTypeControllers.updateShipmentType(id, shipmentTypeData)
      await fetchShipmentTypes() // Refresh the list
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to update shipment type'
      handleAuthError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteShipmentType = async (id: number) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await shipmentTypeControllers.deleteShipmentType(id)
      await fetchShipmentTypes() // Refresh the list
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to delete shipment type'
      handleAuthError(err)
      throw err
    } finally {
      loading.value = false
    }
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
    shipmentTypes,
    loading,
    error,
    
    // Getters
    getShipmentTypes,
    getLoading,
    getError,
    
    // Actions
    fetchShipmentTypes,
    createShipmentType,
    updateShipmentType,
    deleteShipmentType,
    clearError
  }
}, {
  persist: true
}) 