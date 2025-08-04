import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { currenciesControllers } from '../api/controllers/currencies.controllers'
import type { Currencies, CreateCurrencies, UpdateCurrencies } from '../api/models/currencies.model'

export const useCurrenciesStore = defineStore('currencies', () => {
  // State
  const currencies = ref<Currencies[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const pagination = ref({
    total: 0,
    limit: 10,
    skip: 0,
    currentPage: 1
  })

  // Getters
  const getCurrencies = computed(() => currencies.value)
  const getLoading = computed(() => loading.value)
  const getError = computed(() => error.value)
  const getPagination = computed(() => pagination.value)

  // Actions
  const fetchCurrencies = async (params?: { query?: any }) => {
    loading.value = true
    error.value = null

    try {
      const response = await currenciesControllers.getCurrencies(params)
      currencies.value = response.data || []
      pagination.value = {
        total: response.total || 0,
        limit: response.limit || 10,
        skip: response.skip || 0,
        currentPage: Math.floor((response.skip || 0) / (response.limit || 10)) + 1
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch currencies'
      console.error('Error fetching currencies:', err)
    } finally {
      loading.value = false
    }
  }

  const createCurrency = async (data: CreateCurrencies) => {
    loading.value = true
    error.value = null

    try {
      const response = await currenciesControllers.createCurrency(data)
      
      // Add to local state
      currencies.value.push(response)
      
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to create currency'
      console.error('Error creating currency:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateCurrency = async (id: number, data: UpdateCurrencies) => {
    loading.value = true
    error.value = null

    try {
      const response = await currenciesControllers.updateCurrency(id, data)
      
      // Update in local state
      const index = currencies.value.findIndex(c => c.id === id)
      if (index !== -1) {
        currencies.value[index] = response
      }
      
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to update currency'
      console.error('Error updating currency:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteCurrency = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      await currenciesControllers.deleteCurrency(id)
      
      // Remove from local state
      currencies.value = currencies.value.filter(c => c.id !== id)
    } catch (err: any) {
      error.value = err.message || 'Failed to delete currency'
      console.error('Error deleting currency:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const getCurrency = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      const response = await currenciesControllers.getCurrency(id)
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch currency'
      console.error('Error fetching currency:', err)
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
    currencies,
    loading,
    error,
    pagination,

    // Getters
    getCurrencies,
    getLoading,
    getError,
    getPagination,

    // Actions
    fetchCurrencies,
    createCurrency,
    updateCurrency,
    deleteCurrency,
    getCurrency,

    // Pagination
    setPage,
    setLimit,

    // Error handling
    clearError
  }
}, {
  persist: false
}) 