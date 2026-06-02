import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { packageTypeControllers } from '../api/controllers/package-type.controllers'
import type { PackageType, CreatePackageType, UpdatePackageType } from '../api/models/package-type.model'

export const usePackageTypeStore = defineStore('packageType', () => {
  // State
  const packageTypes = ref<PackageType[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const pagination = ref({
    total: 0,
    limit: 10,
    skip: 0,
    currentPage: 1
  })

  // Getters
  const getPackageTypes = computed(() => packageTypes.value)
  const getLoading = computed(() => loading.value)
  const getError = computed(() => error.value)
  const getPagination = computed(() => pagination.value)

  // Actions
  const fetchPackageTypes = async (params?: { query?: any }) => {
    loading.value = true
    error.value = null
    try {
      const timeoutMs = 30000
      const response = await Promise.race([
        packageTypeControllers.getPackageTypes(params),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Request timed out')), timeoutMs)
        )
      ]) as { data?: PackageType[]; total?: number; limit?: number; skip?: number } | undefined
      if (response && typeof response === 'object' && Array.isArray(response.data)) {
        packageTypes.value = response.data
        pagination.value = {
          total: response.total ?? 0,
          limit: response.limit ?? 10,
          skip: response.skip ?? 0,
          currentPage: Math.floor((response.skip ?? 0) / (response.limit || 10)) + 1
        }
      } else if (Array.isArray(response)) {
        packageTypes.value = response
        pagination.value = { total: response.length, limit: response.length, skip: 0, currentPage: 1 }
      } else {
        packageTypes.value = []
        pagination.value = { total: 0, limit: 10, skip: 0, currentPage: 1 }
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch package types'
      handleAuthError(err)
      packageTypes.value = []
    } finally {
      loading.value = false
    }
  }

  const setPage = (page: number) => {
    pagination.value.currentPage = page
    pagination.value.skip = (page - 1) * pagination.value.limit
  }

  const setLimit = (limit: number) => {
    pagination.value.limit = limit
    pagination.value.currentPage = 1
    pagination.value.skip = 0
  }

  const createPackageType = async (packageTypeData: CreatePackageType) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await packageTypeControllers.createPackageType(packageTypeData)
      // Caller (page) should call loadPackageTypes() to refresh with current query
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to create package type'
      handleAuthError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updatePackageType = async (id: number, packageTypeData: UpdatePackageType) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await packageTypeControllers.updatePackageType(id, packageTypeData)
      // Caller (page) should call loadPackageTypes() to refresh with current query
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to update package type'
      handleAuthError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deletePackageType = async (id: number) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await packageTypeControllers.deletePackageType(id)
      // Caller (page) should call loadPackageTypes() to refresh with current query
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to delete package type'
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
    packageTypes,
    loading,
    error,
    pagination,
    // Getters
    getPackageTypes,
    getLoading,
    getError,
    getPagination,
    // Actions
    fetchPackageTypes,
    createPackageType,
    updatePackageType,
    deletePackageType,
    clearError,
    setPage,
    setLimit
  }
}, {
  persist: { key: 'package-type', pick: ['packageTypes'] }
}) 