import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { userControllers } from '../api/controllers/user.controllers'
import type { User, CreateUser, UpdateUser } from '../api/models/user.model'

export const useUserStore = defineStore('user', () => {
  // State
  const users = ref<User[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const pagination = ref({
    total: 0,
    limit: 10,
    skip: 0,
    currentPage: 1
  })

  // Getters
  const getUsers = computed(() => users.value)
  const getLoading = computed(() => loading.value)
  const getError = computed(() => error.value)
  const getPagination = computed(() => pagination.value)

  // Actions
  const fetchUsers = async (params?: { query?: any }) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await userControllers.getUsers(params)
      
      if (response && response.data) {
        users.value = response.data
        pagination.value = {
          total: response.total || 0,
          limit: response.limit || 10,
          skip: response.skip || 0,
          currentPage: Math.floor((response.skip || 0) / (response.limit || 10)) + 1
        }
      } else if (Array.isArray(response)) {
        users.value = response
        pagination.value = {
          total: response.length,
          limit: response.length,
          skip: 0,
          currentPage: 1
        }
      } else {
        users.value = []
        pagination.value = {
          total: 0,
          limit: 10,
          skip: 0,
          currentPage: 1
        }
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch users'
      handleAuthError(err)
    } finally {
      loading.value = false
    }
  }

  const fetchUser = async (id: number) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await userControllers.getUser(id)
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch user'
      handleAuthError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const createUser = async (userData: CreateUser) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await userControllers.createUser(userData)
      await fetchUsers() // Refresh the list
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to create user'
      handleAuthError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateUser = async (id: number, userData: UpdateUser) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await userControllers.updateUser(id, userData)
      await fetchUsers() // Refresh the list
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to update user'
      handleAuthError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteUser = async (id: number) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await userControllers.deleteUser(id)
      await fetchUsers() // Refresh the list
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to delete user'
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
    if (err.message?.includes('Authentication') || err.message?.includes('401')) {
      // Handle authentication error - could redirect to login
      console.error('Authentication error:', err)
    }
  }

  return {
    // State
    users,
    loading,
    error,
    pagination,
    
    // Getters
    getUsers,
    getLoading,
    getError,
    getPagination,
    
    // Actions
    fetchUsers,
    fetchUser,
    createUser,
    updateUser,
    deleteUser,
    setPage,
    setLimit,
    clearError
  }
}, {
  persist: true
}) 