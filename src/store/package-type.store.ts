import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { packageTypeControllers } from '../api/controllers/package-type.controllers'
import type { PackageType, CreatePackageType, UpdatePackageType } from '../api/models/package-type.model'

export const usePackageTypeStore = defineStore('packageType', () => {
  // State
  const packageTypes = ref<PackageType[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const getPackageTypes = computed(() => packageTypes.value)
  const getLoading = computed(() => loading.value)
  const getError = computed(() => error.value)

  // Actions
  const fetchPackageTypes = async (params?: { query?: any }) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await packageTypeControllers.getPackageTypes(params)
      
      if (response && response.data) {
        packageTypes.value = response.data
      } else if (Array.isArray(response)) {
        packageTypes.value = response
      } else {
        packageTypes.value = []
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch package types'
      handleAuthError(err)
    } finally {
      loading.value = false
    }
  }

  const createPackageType = async (packageTypeData: CreatePackageType) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await packageTypeControllers.createPackageType(packageTypeData)
      await fetchPackageTypes() // Refresh the list
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
      await fetchPackageTypes() // Refresh the list
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
      await fetchPackageTypes() // Refresh the list
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
    
    // Getters
    getPackageTypes,
    getLoading,
    getError,
    
    // Actions
    fetchPackageTypes,
    createPackageType,
    updatePackageType,
    deletePackageType,
    clearError
  }
}, {
  persist: true
}) 