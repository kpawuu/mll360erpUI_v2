import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { packageSizeControllers } from '../api/controllers/package-size.controllers'
import type { PackageSize, CreatePackageSize, UpdatePackageSize } from '../api/models/package-size.model'

export const usePackageSizeStore = defineStore('packageSize', () => {
  // State
  const packageSizes = ref<PackageSize[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const getPackageSizes = computed(() => packageSizes.value)
  const getLoading = computed(() => loading.value)
  const getError = computed(() => error.value)

  // Actions
  const fetchPackageSizes = async (params?: { query?: any }) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await packageSizeControllers.getPackageSizes(params)
      
      if (response && response.data) {
        packageSizes.value = response.data
      } else if (Array.isArray(response)) {
        packageSizes.value = response
      } else {
        packageSizes.value = []
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch package sizes'
      handleAuthError(err)
    } finally {
      loading.value = false
    }
  }

  const createPackageSize = async (packageSizeData: CreatePackageSize) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await packageSizeControllers.createPackageSize(packageSizeData)
      await fetchPackageSizes() // Refresh the list
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
      await fetchPackageSizes() // Refresh the list
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
      await fetchPackageSizes() // Refresh the list
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
    
    // Getters
    getPackageSizes,
    getLoading,
    getError,
    
    // Actions
    fetchPackageSizes,
    createPackageSize,
    updatePackageSize,
    deletePackageSize,
    clearError
  }
}, {
  persist: true
}) 