import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { packageSizeControllers } from '../api/controllers/package-size.controllers'
import type { PackageSize, CreatePackageSize, UpdatePackageSize } from '../api/models/package-size.model'

export const usePackageSizeStore = defineStore('packageSize', () => {
  // State
  const packageSizes = ref<PackageSize[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const pagination = ref({
    total: 0,
    limit: 10,
    skip: 0,
    currentPage: 1
  })

  // Getters
  const getPackageSizes = computed(() => packageSizes.value)
  const getLoading = computed(() => loading.value)
  const getError = computed(() => error.value)
  const getPagination = computed(() => pagination.value)

  // Actions
  const fetchPackageSizes = async (params?: { query?: any }) => {
    loading.value = true
    error.value = null
    try {
      const timeoutMs = 30000
      const response = await Promise.race([
        packageSizeControllers.getPackageSizes(params),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Request timed out')), timeoutMs)
        )
      ]) as { data?: PackageSize[]; total?: number; limit?: number; skip?: number } | undefined
      if (response && typeof response === 'object' && Array.isArray(response.data)) {
        packageSizes.value = response.data
        pagination.value = {
          total: response.total ?? 0,
          limit: response.limit ?? 10,
          skip: response.skip ?? 0,
          currentPage: Math.floor((response.skip ?? 0) / (response.limit || 10)) + 1
        }
      } else if (Array.isArray(response)) {
        packageSizes.value = response
        pagination.value = { total: response.length, limit: response.length, skip: 0, currentPage: 1 }
      } else {
        packageSizes.value = []
        pagination.value = { total: 0, limit: 10, skip: 0, currentPage: 1 }
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch package sizes'
      handleAuthError(err)
      packageSizes.value = []
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

  const createPackageSize = async (packageSizeData: CreatePackageSize) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await packageSizeControllers.createPackageSize(packageSizeData)
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to create package size'
      handleAuthError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updatePackageSize = async (id: number, packageSizeData: UpdatePackageSize) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await packageSizeControllers.updatePackageSize(id, packageSizeData)
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to update package size'
      handleAuthError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deletePackageSize = async (id: number) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await packageSizeControllers.deletePackageSize(id)
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to delete package size'
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
    packageSizes,
    loading,
    error,
    pagination,
    
    // Getters
    getPackageSizes,
    getLoading,
    getError,
    getPagination,
    
    // Actions
    fetchPackageSizes,
    createPackageSize,
    updatePackageSize,
    deletePackageSize,
    clearError,
    setPage,
    setLimit
  }
}, {
  persist: { key: 'package-size', pick: ['packageSizes'] }
}) 