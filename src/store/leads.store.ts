import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import feathersClient from '../api/feathers'
import type { Leads, CreateLeads, UpdateLeads } from '../api/models/leads.model'

export const useLeadsStore = defineStore('leads', () => {
  // State
  const leads = ref<Leads[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const pagination = ref({
    total: 0,
    limit: 10,
    skip: 0,
    currentPage: 1
  })

  // Getters
  const getLeads = computed(() => leads.value)
  const getLoading = computed(() => loading.value)
  const getError = computed(() => error.value)
  const getPagination = computed(() => pagination.value)

  // Actions
  const fetchLeads = async (params?: { query?: any }) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await feathersClient.service('crm/leads').find(params)
      leads.value = response.data || []
      pagination.value = {
        total: response.total || 0,
        limit: response.limit || 10,
        skip: response.skip || 0,
        currentPage: Math.floor((response.skip || 0) / (response.limit || 10)) + 1
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch leads'
      console.error('Error fetching leads:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchLead = async (id: number) => {
    loading.value = true
    error.value = null
    
    try {
      const lead = await feathersClient.service('crm/leads').get(id)
      return lead
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch lead'
      console.error('Error fetching lead:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const createLead = async (leadData: CreateLeads) => {
    loading.value = true
    error.value = null
    
    try {
      const newLead = await feathersClient.service('crm/leads').create(leadData)
      leads.value.unshift(newLead)
      pagination.value.total += 1
      return newLead
    } catch (err: any) {
      error.value = err.message || 'Failed to create lead'
      console.error('Error creating lead:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateLead = async (id: number, leadData: UpdateLeads) => {
    loading.value = true
    error.value = null
    
    try {
      const updatedLead = await feathersClient.service('crm/leads').patch(id, leadData)
      const index = leads.value.findIndex(lead => lead.id === id)
      if (index !== -1) {
        leads.value[index] = updatedLead
      }
      return updatedLead
    } catch (err: any) {
      error.value = err.message || 'Failed to update lead'
      console.error('Error updating lead:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteLead = async (id: number) => {
    loading.value = true
    error.value = null
    
    try {
      await feathersClient.service('crm/leads').remove(id)
      const index = leads.value.findIndex(lead => lead.id === id)
      if (index !== -1) {
        leads.value.splice(index, 1)
        pagination.value.total -= 1
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to delete lead'
      console.error('Error deleting lead:', err)
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

  const clearError = () => {
    error.value = null
  }

  const reset = () => {
    leads.value = []
    loading.value = false
    error.value = null
    pagination.value = {
      total: 0,
      limit: 10,
      skip: 0,
      currentPage: 1
    }
  }

  return {
    // State
    leads,
    loading,
    error,
    pagination,
    
    // Getters
    getLeads,
    getLoading,
    getError,
    getPagination,
    
    // Actions
    fetchLeads,
    fetchLead,
    createLead,
    updateLead,
    deleteLead,
    setPage,
    setLimit,
    clearError,
    reset
  }
}) 