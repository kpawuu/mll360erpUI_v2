import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { stagesControllers } from '../api/controllers/stages.controllers'
import type { Stages, CreateStages, UpdateStages } from '../api/models/stages.model'

export const useStagesStore = defineStore('stages', () => {
  // State
  const stages = ref<Stages[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const pagination = ref({
    total: 0,
    limit: 10,
    skip: 0,
    currentPage: 1
  })

  // Getters
  const getStages = computed(() => stages.value)
  const getLoading = computed(() => loading.value)
  const getError = computed(() => error.value)
  const getPagination = computed(() => pagination.value)

  // Actions
  const fetchStages = async (params?: { query?: any }) => {
    loading.value = true
    error.value = null

    try {
      const response = await stagesControllers.getStages(params)
      stages.value = response.data || []
      pagination.value = {
        total: response.total || 0,
        limit: response.limit || 10,
        skip: response.skip || 0,
        currentPage: Math.floor((response.skip || 0) / (response.limit || 10)) + 1
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch stages'
      console.error('Error fetching stages:', err)
    } finally {
      loading.value = false
    }
  }

  const createStage = async (data: CreateStages) => {
    loading.value = true
    error.value = null

    try {
      const response = await stagesControllers.createStage(data)
      
      // Add to local state
      stages.value.push(response)
      
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to create stage'
      console.error('Error creating stage:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateStage = async (id: number, data: UpdateStages) => {
    loading.value = true
    error.value = null

    try {
      const response = await stagesControllers.updateStage(id, data)
      
      // Update in local state
      const index = stages.value.findIndex(s => s.id === id)
      if (index !== -1) {
        stages.value[index] = response
      }
      
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to update stage'
      console.error('Error updating stage:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteStage = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      await stagesControllers.deleteStage(id)
      
      // Remove from local state
      stages.value = stages.value.filter(s => s.id !== id)
    } catch (err: any) {
      error.value = err.message || 'Failed to delete stage'
      console.error('Error deleting stage:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const getStage = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      const response = await stagesControllers.getStage(id)
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch stage'
      console.error('Error fetching stage:', err)
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
    stages,
    loading,
    error,
    pagination,

    // Getters
    getStages,
    getLoading,
    getError,
    getPagination,

    // Actions
    fetchStages,
    createStage,
    updateStage,
    deleteStage,
    getStage,

    // Pagination
    setPage,
    setLimit,

    // Error handling
    clearError
  }
}, {
  persist: false
}) 