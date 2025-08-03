import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { rolesControllers } from '../api/controllers/roles.controllers'
import type { Roles, CreateRolesData, UpdateRolesData } from '../api/models/roles.model'

export const useRolesStore = defineStore('roles', () => {
  const roles = ref<Roles[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const getRoles = computed(() => roles.value)
  const getLoading = computed(() => loading.value)
  const getError = computed(() => error.value)

  const fetchRoles = async (params?: { query?: any }) => {
    try {
      loading.value = true
      error.value = null
      const response = await rolesControllers.getRoles(params)
      roles.value = response.data || response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch roles'
      handleAuthError(err)
    } finally {
      loading.value = false
    }
  }

  const createRole = async (roleData: CreateRolesData) => {
    try {
      loading.value = true
      error.value = null
      const result = await rolesControllers.createRole(roleData)
      await fetchRoles()
      return result
    } catch (err: any) {
      error.value = err.message || 'Failed to create role'
      handleAuthError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateRole = async (id: number, roleData: UpdateRolesData) => {
    try {
      loading.value = true
      error.value = null
      const result = await rolesControllers.updateRole(id, roleData)
      await fetchRoles()
      return result
    } catch (err: any) {
      error.value = err.message || 'Failed to update role'
      handleAuthError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteRole = async (id: number) => {
    try {
      loading.value = true
      error.value = null
      const result = await rolesControllers.deleteRole(id)
      await fetchRoles()
      return result
    } catch (err: any) {
      error.value = err.message || 'Failed to delete role'
      handleAuthError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const clearError = () => {
    error.value = null
  }

  const handleAuthError = (err: any) => {
    if (err.code === 401) {
      // Handle authentication error
      console.error('Authentication error:', err)
    }
  }

  return {
    roles,
    loading,
    error,
    getRoles,
    getLoading,
    getError,
    fetchRoles,
    createRole,
    updateRole,
    deleteRole,
    clearError
  }
}, { persist: true }) 