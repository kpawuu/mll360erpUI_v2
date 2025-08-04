import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { entityContactPersonControllers } from '../api/controllers/entity-contact-person.controllers'
import { useAuthStore } from './auth.store'
import type { EntityContactPerson, CreateEntityContactPerson, UpdateEntityContactPerson } from '../api/models/entity-contact-person.model'

export const useEntityContactPersonStore = defineStore('entityContactPerson', () => {
  const authStore = useAuthStore()
  
  // State
  const contactPersons = ref<EntityContactPerson[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const pagination = ref({
    total: 0,
    limit: 10,
    skip: 0,
    currentPage: 1
  })

  // Getters
  const getContactPersons = computed(() => contactPersons.value)
  const getLoading = computed(() => loading.value)
  const getError = computed(() => error.value)
  const getPagination = computed(() => pagination.value)

  // Get user's company ID
  const getUserCompanyId = computed(() => authStore.user?.company_id)

  // Actions
  const fetchContactPersons = async (entityId: number, params?: { query?: any }) => {
    loading.value = true
    error.value = null

    try {
      const companyId = getUserCompanyId.value
      if (!companyId) {
        throw new Error('User company not found')
      }

      const queryParams = {
        ...params,
        query: {
          ...params?.query,
          company_id: companyId,
          entity_id: entityId
        }
      }

      const response = await entityContactPersonControllers.getContactPersons(queryParams)
      contactPersons.value = response.data || []
      pagination.value = {
        total: response.total || 0,
        limit: response.limit || 10,
        skip: response.skip || 0,
        currentPage: Math.floor((response.skip || 0) / (response.limit || 10)) + 1
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch contact persons'
      console.error('Error fetching contact persons:', err)
      handleAuthError(err)
    } finally {
      loading.value = false
    }
  }

  const createContactPerson = async (data: CreateEntityContactPerson) => {
    loading.value = true
    error.value = null

    try {
      const companyId = getUserCompanyId.value
      if (!companyId) {
        throw new Error('User company not found')
      }

      const contactPersonData = {
        ...data,
        company_id: companyId
      }

      const response = await entityContactPersonControllers.createContactPerson(contactPersonData)
      
      // Add to local state
      contactPersons.value.push(response)
      
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to create contact person'
      console.error('Error creating contact person:', err)
      handleAuthError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateContactPerson = async (id: number, data: UpdateEntityContactPerson) => {
    loading.value = true
    error.value = null

    try {
      const response = await entityContactPersonControllers.updateContactPerson(id, data)
      
      // Update in local state
      const index = contactPersons.value.findIndex(cp => cp.id === id)
      if (index !== -1) {
        contactPersons.value[index] = response
      }
      
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to update contact person'
      console.error('Error updating contact person:', err)
      handleAuthError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteContactPerson = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      await entityContactPersonControllers.deleteContactPerson(id)
      
      // Remove from local state
      contactPersons.value = contactPersons.value.filter(cp => cp.id !== id)
    } catch (err: any) {
      error.value = err.message || 'Failed to delete contact person'
      console.error('Error deleting contact person:', err)
      handleAuthError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const getContactPerson = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      const response = await entityContactPersonControllers.getContactPerson(id)
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch contact person'
      console.error('Error fetching contact person:', err)
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
    if (err.code === 401) {
      console.log('Authentication error, logging out...')
      authStore.logout()
    }
  }

  return {
    // State
    contactPersons,
    loading,
    error,
    pagination,

    // Getters
    getContactPersons,
    getLoading,
    getError,
    getPagination,

    // Actions
    fetchContactPersons,
    createContactPerson,
    updateContactPerson,
    deleteContactPerson,
    getContactPerson,

    // Pagination
    setPage,
    setLimit,

    // Error handling
    clearError
  }
}, {
  persist: false
}) 