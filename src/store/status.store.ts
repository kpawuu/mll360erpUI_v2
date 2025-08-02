import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { statusControllers } from '../api/controllers/status.controllers'
import type { Status, CreateStatus, UpdateStatus } from '../api/models/status.model'

export const useStatusStore = defineStore('status', () => {
  // State
  const statuses = ref<Status[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const getStatuses = computed(() => statuses.value)
  const getLoading = computed(() => loading.value)
  const getError = computed(() => error.value)

  // Actions
  const fetchStatuses = async (params?: { query?: any }) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await statusControllers.getStatuses(params)
      
      if (response && response.data) {
        statuses.value = response.data
      } else if (Array.isArray(response)) {
        statuses.value = response
      } else {
        statuses.value = []
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch statuses'
      handleAuthError(err)
    } finally {
      loading.value = false
    }
  }

  const createStatus = async (statusData: CreateStatus) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await statusControllers.createStatus(statusData)
      await fetchStatuses() // Refresh the list
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to create status'
      handleAuthError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateStatus = async (id: number, statusData: UpdateStatus) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await statusControllers.updateStatus(id, statusData)
      await fetchStatuses() // Refresh the list
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to update status'
      handleAuthError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteStatus = async (id: number) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await statusControllers.deleteStatus(id)
      await fetchStatuses() // Refresh the list
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to delete status'
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
    statuses,
    loading,
    error,
    
    // Getters
    getStatuses,
    getLoading,
    getError,
    
    // Actions
    fetchStatuses,
    createStatus,
    updateStatus,
    deleteStatus,
    clearError
  }
}, {
  persist: true
}) 