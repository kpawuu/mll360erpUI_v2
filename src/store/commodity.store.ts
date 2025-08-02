import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { commodityControllers } from '../api/controllers/commodity.controllers'
import type { Commodity, CreateCommodity, UpdateCommodity } from '../api/models/commodity.model'

export const useCommodityStore = defineStore('commodity', () => {
  // State
  const commodities = ref<Commodity[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const getCommodities = computed(() => commodities.value)
  const getLoading = computed(() => loading.value)
  const getError = computed(() => error.value)

  // Actions
  const fetchCommodities = async (params?: { query?: any }) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await commodityControllers.getCommodities(params)
      
      if (response && response.data) {
        commodities.value = response.data
      } else if (Array.isArray(response)) {
        commodities.value = response
      } else {
        commodities.value = []
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch commodities'
      handleAuthError(err)
    } finally {
      loading.value = false
    }
  }

  const createCommodity = async (commodityData: CreateCommodity) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await commodityControllers.createCommodity(commodityData)
      await fetchCommodities() // Refresh the list
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to create commodity'
      handleAuthError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateCommodity = async (id: number, commodityData: UpdateCommodity) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await commodityControllers.updateCommodity(id, commodityData)
      await fetchCommodities() // Refresh the list
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to update commodity'
      handleAuthError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteCommodity = async (id: number) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await commodityControllers.deleteCommodity(id)
      await fetchCommodities() // Refresh the list
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to delete commodity'
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
    commodities,
    loading,
    error,
    
    // Getters
    getCommodities,
    getLoading,
    getError,
    
    // Actions
    fetchCommodities,
    createCommodity,
    updateCommodity,
    deleteCommodity,
    clearError
  }
}, {
  persist: true
}) 