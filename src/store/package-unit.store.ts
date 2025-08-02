import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { packageUnitControllers } from '../api/controllers/package-unit.controllers'
import type { PackageUnit, CreatePackageUnit, UpdatePackageUnit } from '../api/models/package-unit.model'

export const usePackageUnitStore = defineStore('packageUnit', () => {
  // State
  const packageUnits = ref<PackageUnit[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const getPackageUnits = computed(() => packageUnits.value)
  const getLoading = computed(() => loading.value)
  const getError = computed(() => error.value)

  // Actions
  const fetchPackageUnits = async (params?: { query?: any }) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await packageUnitControllers.getPackageUnits(params)
      
      if (response && response.data) {
        packageUnits.value = response.data
      } else if (Array.isArray(response)) {
        packageUnits.value = response
      } else {
        packageUnits.value = []
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch package units'
      handleAuthError(err)
    } finally {
      loading.value = false
    }
  }

  const createPackageUnit = async (packageUnitData: CreatePackageUnit) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await packageUnitControllers.createPackageUnit(packageUnitData)
      await fetchPackageUnits() // Refresh the list
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to create package unit'
      handleAuthError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updatePackageUnit = async (id: number, packageUnitData: UpdatePackageUnit) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await packageUnitControllers.updatePackageUnit(id, packageUnitData)
      await fetchPackageUnits() // Refresh the list
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to update package unit'
      handleAuthError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deletePackageUnit = async (id: number) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await packageUnitControllers.deletePackageUnit(id)
      await fetchPackageUnits() // Refresh the list
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to delete package unit'
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
    packageUnits,
    loading,
    error,
    
    // Getters
    getPackageUnits,
    getLoading,
    getError,
    
    // Actions
    fetchPackageUnits,
    createPackageUnit,
    updatePackageUnit,
    deletePackageUnit,
    clearError
  }
}, {
  persist: true
}) 