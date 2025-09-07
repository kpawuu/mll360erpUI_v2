import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { logisticsContractRatesControllers } from '../api/controllers/logistics-contract-rates.controllers'
import type { LogisticsContractRate, CreateLogisticsContractRate, UpdateLogisticsContractRate } from '../api/models/logistics-contract-rates.model'

export const useLogisticsContractRatesStore = defineStore('logisticsContractRates', () => {
  // State
  const rates = ref<LogisticsContractRate[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const pagination = ref({
    total: 0,
    limit: 20,
    skip: 0,
    currentPage: 1
  })

  // Getters
  const getRates = computed(() => rates.value)
  const getLoading = computed(() => loading.value)
  const getError = computed(() => error.value)
  const getPagination = computed(() => pagination.value)

  // Get total pages
  const getTotalPages = computed(() => {
    return Math.ceil(pagination.value.total / pagination.value.limit)
  })

  // Get rates by opportunity
  const getRatesByOpportunity = computed(() => {
    return (opportunityId: number) => rates.value.filter(rate => rate.opportunity_id === opportunityId)
  })

  // Get rates by service category
  const getRatesByServiceCategory = computed(() => {
    return (serviceCategory: string) => rates.value.filter(rate => rate.service_category === serviceCategory)
  })

  // Get active rates
  const getActiveRates = computed(() => {
    return rates.value.filter(rate => rate.is_active)
  })

  // Actions
  const fetchRates = async (params?: { query?: any }) => {
    loading.value = true
    error.value = null

    try {
      const response = await logisticsContractRatesControllers.getLogisticsContractRates(params)
      rates.value = response.data || []
      pagination.value = {
        total: response.total || 0,
        limit: response.limit || 20,
        skip: response.skip || 0,
        currentPage: Math.floor((response.skip || 0) / (response.limit || 20)) + 1
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch rates'
      console.error('Error fetching logistics contract rates:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchRate = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      const response = await logisticsContractRatesControllers.getLogisticsContractRate(id)
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch rate'
      console.error('Error fetching logistics contract rate:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const createRate = async (data: CreateLogisticsContractRate) => {
    loading.value = true
    error.value = null

    try {
      const response = await logisticsContractRatesControllers.createLogisticsContractRate(data)
      
      // Add to local state
      rates.value.unshift(response)
      
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to create rate'
      console.error('Error creating logistics contract rate:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateRate = async (id: number, data: UpdateLogisticsContractRate) => {
    loading.value = true
    error.value = null

    try {
      const response = await logisticsContractRatesControllers.updateLogisticsContractRate(id, data)
      
      // Update in local state
      const index = rates.value.findIndex(r => r.id === id)
      if (index !== -1) {
        rates.value[index] = response
      }
      
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to update rate'
      console.error('Error updating logistics contract rate:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteRate = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      await logisticsContractRatesControllers.deleteLogisticsContractRate(id)
      
      // Remove from local state
      rates.value = rates.value.filter(r => r.id !== id)
    } catch (err: any) {
      error.value = err.message || 'Failed to delete rate'
      console.error('Error deleting logistics contract rate:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchRatesByOpportunity = async (opportunityId: number) => {
    loading.value = true
    error.value = null

    try {
      const response = await logisticsContractRatesControllers.getRatesByOpportunity(opportunityId)
      // Update the local rates state with opportunity-specific rates
      rates.value = response.data || response || []
      return response.data || response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch rates by opportunity'
      console.error('Error fetching rates by opportunity:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchActiveRatesByCategory = async (category: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await logisticsContractRatesControllers.getActiveRatesByCategory(category)
      return response.data || response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch active rates by category'
      console.error('Error fetching active rates by category:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const bulkCreateRates = async (ratesData: CreateLogisticsContractRate[]) => {
    loading.value = true
    error.value = null

    try {
      const responses = await logisticsContractRatesControllers.bulkCreateRates(ratesData)
      
      // Add to local state
      rates.value.unshift(...responses)
      
      return responses
    } catch (err: any) {
      error.value = err.message || 'Failed to bulk create rates'
      console.error('Error bulk creating rates:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const toggleRateStatus = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      const response = await logisticsContractRatesControllers.toggleRateStatus(id)
      
      // Update in local state
      const index = rates.value.findIndex(r => r.id === id)
      if (index !== -1) {
        rates.value[index] = response
      }
      
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to toggle rate status'
      console.error('Error toggling rate status:', err)
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
    rates,
    loading,
    error,
    pagination,

    // Getters
    getRates,
    getLoading,
    getError,
    getPagination,
    getTotalPages,
    getRatesByOpportunity,
    getRatesByServiceCategory,
    getActiveRates,

    // Actions
    fetchRates,
    fetchRate,
    createRate,
    updateRate,
    deleteRate,
    fetchRatesByOpportunity,
    fetchActiveRatesByCategory,
    bulkCreateRates,
    toggleRateStatus,

    // Pagination
    setPage,
    setLimit,

    // Error handling
    clearError
  }
}, {
  persist: false
})
