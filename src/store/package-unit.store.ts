import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { packageUnitControllers } from '../api/controllers/package-unit.controllers'
import type { PackageUnit, CreatePackageUnit, UpdatePackageUnit } from '../api/models/package-unit.model'

export const usePackageUnitStore = defineStore('packageUnit', () => {
  // State
  const packageUnits = ref<PackageUnit[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const pagination = ref({
    total: 0,
    limit: 10,
    skip: 0,
    currentPage: 1
  })

  // Getters
  const getPackageUnits = computed(() => packageUnits.value)
  const getLoading = computed(() => loading.value)
  const getError = computed(() => error.value)
  const getPagination = computed(() => pagination.value)

  // Actions
  const fetchPackageUnits = async (params?: { query?: any }) => {
    loading.value = true
    error.value = null
    try {
      const timeoutMs = 30000
      const response = await Promise.race([
        packageUnitControllers.getPackageUnits(params),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Request timed out')), timeoutMs)
        )
      ]) as { data?: PackageUnit[]; total?: number; limit?: number; skip?: number } | undefined
      if (response && typeof response === 'object' && Array.isArray(response.data)) {
        packageUnits.value = response.data
        pagination.value = {
          total: response.total ?? 0,
          limit: response.limit ?? 10,
          skip: response.skip ?? 0,
          currentPage: Math.floor((response.skip ?? 0) / (response.limit || 10)) + 1
        }
      } else if (Array.isArray(response)) {
        packageUnits.value = response
        pagination.value = { total: response.length, limit: response.length, skip: 0, currentPage: 1 }
      } else {
        packageUnits.value = []
        pagination.value = { total: 0, limit: 10, skip: 0, currentPage: 1 }
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch package units'
      handleAuthError(err)
      packageUnits.value = []
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

  const createPackageUnit = async (packageUnitData: CreatePackageUnit) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await packageUnitControllers.createPackageUnit(packageUnitData)
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
    pagination,
    // Getters
    getPackageUnits,
    getLoading,
    getError,
    getPagination,
    // Actions
    fetchPackageUnits,
    createPackageUnit,
    updatePackageUnit,
    deletePackageUnit,
    clearError,
    setPage,
    setLimit
  }
}, {
  persist: { key: 'package-unit', pick: ['packageUnits'] }
}) 