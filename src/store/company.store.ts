import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { companyControllers } from '../api/controllers/company.controllers'
import type { Company, CreateCompany, UpdateCompany } from '../api/models/company.model'
import { handleAuthError } from '../api/utils/auth-error-handler'

export const useCompanyStore = defineStore('company', () => {
  // State
  const companies = ref<Company[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const pagination = ref({
    total: 0,
    limit: 10,
    skip: 0,
    currentPage: 1
  })

  // Getters
  const getCompanies = computed(() => companies.value)
  const getLoading = computed(() => loading.value)
  const getError = computed(() => error.value)
  const getPagination = computed(() => pagination.value)

  // Actions
  const fetchCompanies = async (params?: { query?: any }) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await companyControllers.getCompanies(params)
      
      if (response && response.data) {
        companies.value = response.data
        pagination.value = {
          total: response.total || 0,
          limit: response.limit || 10,
          skip: response.skip || 0,
          currentPage: Math.floor((response.skip || 0) / (response.limit || 10)) + 1
        }
      } else if (Array.isArray(response)) {
        companies.value = response
        pagination.value = {
          total: response.length,
          limit: response.length,
          skip: 0,
          currentPage: 1
        }
      } else {
        companies.value = []
        pagination.value = {
          total: 0,
          limit: 10,
          skip: 0,
          currentPage: 1
        }
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch companies'
      await handleAuthError(err)
    } finally {
      loading.value = false
    }
  }

  const fetchCompany = async (id: number) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await companyControllers.getCompany(id)
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch company'
      await handleAuthError(err)
    } finally {
      loading.value = false
    }
  }

  const createCompany = async (companyData: CreateCompany) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await companyControllers.createCompany(companyData)
      await fetchCompanies() // Refresh the list
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to create company'
      await handleAuthError(err)
    } finally {
      loading.value = false
    }
  }

  const updateCompany = async (id: number, companyData: UpdateCompany) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await companyControllers.updateCompany(id, companyData)
      await fetchCompanies() // Refresh the list
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to update company'
      await handleAuthError(err)
    } finally {
      loading.value = false
    }
  }

  const deleteCompany = async (id: number) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await companyControllers.deleteCompany(id)
      await fetchCompanies() // Refresh the list
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to delete company'
      await handleAuthError(err)
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



  return {
    // State
    companies,
    loading,
    error,
    pagination,
    
    // Getters
    getCompanies,
    getLoading,
    getError,
    getPagination,
    
    // Actions
    fetchCompanies,
    fetchCompany,
    createCompany,
    updateCompany,
    deleteCompany,
    setPage,
    setLimit,
    clearError
  }
}, {
  persist: true
}) 