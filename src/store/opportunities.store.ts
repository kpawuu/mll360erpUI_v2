import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import feathersClient from '../api/feathers'
import type { Opportunities, CreateOpportunities, UpdateOpportunities } from '../api/models/opportunities.model'

export const useOpportunitiesStore = defineStore('opportunities', () => {
  // State
  const opportunities = ref<Opportunities[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const pagination = ref({
    total: 0,
    limit: 10,
    skip: 0,
    currentPage: 1
  })

  // Getters
  const getOpportunities = computed(() => opportunities.value)
  const getLoading = computed(() => loading.value)
  const getError = computed(() => error.value)
  const getPagination = computed(() => pagination.value)

  // Actions
  const fetchOpportunities = async (params?: { query?: any }) => {
    loading.value = true
    error.value = null

    try {
      // Ensure proper sorting by recent date if not specified
      const query = params?.query || {}
      if (!query.$sort) {
        query.$sort = {
          date_created: -1 // Most recent first
        }
      }

      const response = await feathersClient.service('crm/opportunities').find({ query })
      opportunities.value = response.data || []
      pagination.value = {
        total: response.total || 0,
        limit: response.limit || 10,
        skip: response.skip || 0,
        currentPage: Math.floor((response.skip || 0) / (response.limit || 10)) + 1
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch opportunities'
      console.error('Error fetching opportunities:', err)
    } finally {
      loading.value = false
    }
  }

  const createOpportunity = async (data: CreateOpportunities) => {
    loading.value = true
    error.value = null

    try {
      const response = await feathersClient.service('crm/opportunities').create(data)
      
      // Add to local state
      opportunities.value.push(response)
      
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to create opportunity'
      console.error('Error creating opportunity:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateOpportunity = async (id: number, data: UpdateOpportunities) => {
    loading.value = true
    error.value = null

    try {
      const response = await feathersClient.service('crm/opportunities').patch(id, data)
      
      // Update in local state
      const index = opportunities.value.findIndex(o => o.id === id)
      if (index !== -1) {
        opportunities.value[index] = response
      }
      
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to update opportunity'
      console.error('Error updating opportunity:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteOpportunity = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      await feathersClient.service('crm/opportunities').remove(id)
      
      // Remove from local state
      opportunities.value = opportunities.value.filter(o => o.id !== id)
    } catch (err: any) {
      error.value = err.message || 'Failed to delete opportunity'
      console.error('Error deleting opportunity:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const getOpportunity = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      const response = await feathersClient.service('crm/opportunities').get(id)
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch opportunity'
      console.error('Error fetching opportunity:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const setPage = (page: number) => {
    pagination.value.currentPage = page
  }

  const setLimit = (limit: number) => {
    pagination.value.limit = limit
  }

  const clearError = () => {
    error.value = null
  }

  return {
    // State
    opportunities,
    loading,
    error,
    pagination,
    
    // Getters
    getOpportunities,
    getLoading,
    getError,
    getPagination,
    
    // Actions
    fetchOpportunities,
    createOpportunity,
    updateOpportunity,
    deleteOpportunity,
    getOpportunity,
    setPage,
    setLimit,
    clearError
  }
}) 