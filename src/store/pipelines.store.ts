import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { pipelinesControllers } from '../api/controllers/pipelines.controllers'
import type { Pipelines, CreatePipelines, UpdatePipelines } from '../api/models/pipelines.model'

export const usePipelinesStore = defineStore('pipelines', () => {
  // State
  const pipelines = ref<Pipelines[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const pagination = ref({
    total: 0,
    limit: 10,
    skip: 0,
    currentPage: 1
  })

  // Getters
  const getPipelines = computed(() => pipelines.value)
  const getLoading = computed(() => loading.value)
  const getError = computed(() => error.value)
  const getPagination = computed(() => pagination.value)

  // Actions
  const fetchPipelines = async (params?: { query?: any }) => {
    loading.value = true
    error.value = null

    try {
      const response = await pipelinesControllers.getPipelines(params)
      pipelines.value = response.data || []
      pagination.value = {
        total: response.total || 0,
        limit: response.limit || 10,
        skip: response.skip || 0,
        currentPage: Math.floor((response.skip || 0) / (response.limit || 10)) + 1
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch pipelines'
      console.error('Error fetching pipelines:', err)
    } finally {
      loading.value = false
    }
  }

  const createPipeline = async (data: CreatePipelines) => {
    loading.value = true
    error.value = null

    try {
      const response = await pipelinesControllers.createPipeline(data)
      
      // Add to local state
      pipelines.value.push(response)
      
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to create pipeline'
      console.error('Error creating pipeline:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updatePipeline = async (id: number, data: UpdatePipelines) => {
    loading.value = true
    error.value = null

    try {
      const response = await pipelinesControllers.updatePipeline(id, data)
      
      // Update in local state
      const index = pipelines.value.findIndex(p => p.id === id)
      if (index !== -1) {
        pipelines.value[index] = response
      }
      
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to update pipeline'
      console.error('Error updating pipeline:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deletePipeline = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      await pipelinesControllers.deletePipeline(id)
      
      // Remove from local state
      pipelines.value = pipelines.value.filter(p => p.id !== id)
    } catch (err: any) {
      error.value = err.message || 'Failed to delete pipeline'
      console.error('Error deleting pipeline:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const getPipeline = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      const response = await pipelinesControllers.getPipeline(id)
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch pipeline'
      console.error('Error fetching pipeline:', err)
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
    pipelines,
    loading,
    error,
    pagination,

    // Getters
    getPipelines,
    getLoading,
    getError,
    getPagination,

    // Actions
    fetchPipelines,
    createPipeline,
    updatePipeline,
    deletePipeline,
    getPipeline,

    // Pagination
    setPage,
    setLimit,

    // Error handling
    clearError
  }
}, {
  persist: false
}) 