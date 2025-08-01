import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { companyBranchesControllers } from '../api/controllers/company-branches.controllers'
import type { CompanyBranch, CreateCompanyBranch, UpdateCompanyBranch } from '../api/models/company-branches.model'

export const useCompanyBranchesStore = defineStore('companyBranches', () => {
  // State
  const branches = ref<CompanyBranch[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const pagination = ref({
    total: 0,
    limit: 10,
    skip: 0,
    currentPage: 1
  })

  // Getters
  const getBranches = computed(() => branches.value)
  const getLoading = computed(() => loading.value)
  const getError = computed(() => error.value)
  const getPagination = computed(() => pagination.value)

  // Actions
  const fetchBranches = async (params?: { query?: any }) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await companyBranchesControllers.getCompanyBranches(params)
      
      if (response && response.data) {
        branches.value = response.data
        pagination.value = {
          total: response.total || 0,
          limit: response.limit || 10,
          skip: response.skip || 0,
          currentPage: Math.floor((response.skip || 0) / (response.limit || 10)) + 1
        }
      } else if (Array.isArray(response)) {
        branches.value = response
        pagination.value = {
          total: response.length,
          limit: response.length,
          skip: 0,
          currentPage: 1
        }
      } else {
        branches.value = []
        pagination.value = {
          total: 0,
          limit: 10,
          skip: 0,
          currentPage: 1
        }
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch branches'
      handleAuthError(err)
    } finally {
      loading.value = false
    }
  }

  const fetchBranch = async (id: number) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await companyBranchesControllers.getCompanyBranch(id)
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch branch'
      handleAuthError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const createBranch = async (branchData: CreateCompanyBranch) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await companyBranchesControllers.createCompanyBranch(branchData)
      await fetchBranches() // Refresh the list
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to create branch'
      handleAuthError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateBranch = async (id: number, branchData: UpdateCompanyBranch) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await companyBranchesControllers.updateCompanyBranch(id, branchData)
      await fetchBranches() // Refresh the list
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to update branch'
      handleAuthError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteBranch = async (id: number) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await companyBranchesControllers.deleteCompanyBranch(id)
      await fetchBranches() // Refresh the list
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to delete branch'
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
      console.error('Authentication error:', err)
    }
  }

  return {
    // State
    branches,
    loading,
    error,
    pagination,
    
    // Getters
    getBranches,
    getLoading,
    getError,
    getPagination,
    
    // Actions
    fetchBranches,
    fetchBranch,
    createBranch,
    updateBranch,
    deleteBranch,
    setPage,
    setLimit,
    clearError
  }
}, {
  persist: true
}) 