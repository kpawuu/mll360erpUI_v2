import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { userRolesControllers } from '../api/controllers/user-roles.controllers'
import type { UserRoles, CreateUserRolesData, UpdateUserRolesData } from '../api/models/user-roles.model'

export const useUserRolesStore = defineStore('userRoles', () => {
  const userRoles = ref<UserRoles[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  // Pagination state
  const pagination = ref({
    currentPage: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  })

  const getUserRoles = computed(() => userRoles.value)
  const getLoading = computed(() => loading.value)
  const getError = computed(() => error.value)

  const fetchUserRoles = async (params?: { query?: any }) => {
    try {
      loading.value = true
      error.value = null
      console.log('🔍 fetchUserRoles called with params:', params)
      const response = await userRolesControllers.getUserRoles(params)
      console.log('🔍 API response:', response)
      
      // Handle paginated response
      if (response.data && response.total !== undefined) {
        userRoles.value = response.data
        pagination.value = {
          currentPage: response.currentPage || 1,
          limit: response.limit || 10,
          total: response.total,
          totalPages: response.totalPages || Math.ceil(response.total / (response.limit || 10))
        }
        console.log('🔍 Using paginated response')
      } else {
        userRoles.value = response
        pagination.value = {
          currentPage: 1,
          limit: response.length || 10,
          total: response.length || 0,
          totalPages: 1
        }
        console.log('🔍 Using direct response (array)')
      }
      console.log('🔍 userRoles.value after assignment:', userRoles.value)
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch user roles'
      handleAuthError(err)
    } finally {
      loading.value = false
    }
  }

  const createUserRole = async (userRoleData: CreateUserRolesData) => {
    try {
      loading.value = true
      error.value = null
      const result = await userRolesControllers.createUserRole(userRoleData)
      await fetchUserRoles()
      return result
    } catch (err: any) {
      error.value = err.message || 'Failed to create user role'
      handleAuthError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateUserRole = async (id: number, userRoleData: UpdateUserRolesData) => {
    try {
      loading.value = true
      error.value = null
      const result = await userRolesControllers.updateUserRole(id, userRoleData)
      await fetchUserRoles()
      return result
    } catch (err: any) {
      error.value = err.message || 'Failed to update user role'
      handleAuthError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteUserRole = async (id: number) => {
    try {
      loading.value = true
      error.value = null
      const result = await userRolesControllers.deleteUserRole(id)
      await fetchUserRoles()
      return result
    } catch (err: any) {
      error.value = err.message || 'Failed to delete user role'
      handleAuthError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const getUserRolesByUser = async (userId: number, companyId: number) => {
    try {
      loading.value = true
      error.value = null
      const response = await userRolesControllers.getUserRolesByUser(userId, companyId)
      return response.data || response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch user roles'
      handleAuthError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const clearError = () => {
    error.value = null
  }

  const clearUserRoles = () => {
    userRoles.value = []
    console.log('🔍 Cleared user roles from store')
  }

  // Pagination methods
  const setPage = (page: number) => {
    pagination.value.currentPage = page
  }

  const setLimit = (limit: number) => {
    pagination.value.limit = limit
  }

  const resetPagination = () => {
    pagination.value = {
      currentPage: 1,
      limit: 10,
      total: 0,
      totalPages: 0
    }
  }

  const handleAuthError = (err: any) => {
    if (err.code === 401) {
      // Handle authentication error
      console.error('Authentication error:', err)
    }
  }

  return {
    userRoles,
    loading,
    error,
    pagination,
    getUserRoles,
    getLoading,
    getError,
    fetchUserRoles,
    createUserRole,
    updateUserRole,
    deleteUserRole,
    getUserRolesByUser,
    clearError,
    clearUserRoles,
    setPage,
    setLimit,
    resetPagination
  }
}, { persist: false }) 