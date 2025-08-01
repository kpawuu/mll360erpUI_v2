import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { usertypeControllers } from '../api/controllers/usertype.controllers'
import type { Usertype, CreateUsertype, UpdateUsertype } from '../api/models/usertype.model'

export const useUsertypeStore = defineStore('usertype', () => {
  // State
  const usertypes = ref<Usertype[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const getUsertypes = computed(() => usertypes.value)
  const getLoading = computed(() => loading.value)
  const getError = computed(() => error.value)

  // Actions
  const fetchUsertypes = async (params?: { query?: any }) => {
    loading.value = true
    error.value = null

    try {
      const response = await usertypeControllers.getUsertypes(params)

      if (response && response.data) {
        usertypes.value = response.data
      } else if (Array.isArray(response)) {
        usertypes.value = response
      } else {
        usertypes.value = []
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch usertypes'
      handleAuthError(err)
    } finally {
      loading.value = false
    }
  }

  const fetchUsertype = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      const response = await usertypeControllers.getUsertype(id)
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch usertype'
      handleAuthError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const createUsertype = async (usertypeData: CreateUsertype) => {
    loading.value = true
    error.value = null

    try {
      const response = await usertypeControllers.createUsertype(usertypeData)
      await fetchUsertypes() // Refresh the list
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to create usertype'
      handleAuthError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateUsertype = async (id: number, usertypeData: UpdateUsertype) => {
    loading.value = true
    error.value = null

    try {
      const response = await usertypeControllers.updateUsertype(id, usertypeData)
      await fetchUsertypes() // Refresh the list
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to update usertype'
      handleAuthError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteUsertype = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      const response = await usertypeControllers.deleteUsertype(id)
      await fetchUsertypes() // Refresh the list
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to delete usertype'
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
      // Handle authentication error - could redirect to login
      console.error('Authentication error:', err)
    }
  }

  return {
    // State
    usertypes,
    loading,
    error,

    // Getters
    getUsertypes,
    getLoading,
    getError,

    // Actions
    fetchUsertypes,
    fetchUsertype,
    createUsertype,
    updateUsertype,
    deleteUsertype,
    clearError
  }
}, {
  persist: true
}) 