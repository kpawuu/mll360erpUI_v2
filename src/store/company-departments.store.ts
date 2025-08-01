import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { companyDepartmentsControllers } from '../api/controllers/company-departments.controllers'
import type { CompanyDepartment, CreateCompanyDepartment, UpdateCompanyDepartment } from '../api/models/company-departments.model'

export const useCompanyDepartmentsStore = defineStore('companyDepartments', () => {
  // State
  const departments = ref<CompanyDepartment[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const pagination = ref({
    total: 0,
    limit: 10,
    skip: 0,
    currentPage: 1
  })

  // Getters
  const getDepartments = computed(() => departments.value)
  const getLoading = computed(() => loading.value)
  const getError = computed(() => error.value)
  const getPagination = computed(() => pagination.value)

  // Actions
  const fetchDepartments = async (params?: { query?: any }) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await companyDepartmentsControllers.getCompanyDepartments(params)
      
      if (response && response.data) {
        departments.value = response.data
        pagination.value = {
          total: response.total || 0,
          limit: response.limit || 10,
          skip: response.skip || 0,
          currentPage: Math.floor((response.skip || 0) / (response.limit || 10)) + 1
        }
      } else if (Array.isArray(response)) {
        departments.value = response
        pagination.value = {
          total: response.length,
          limit: response.length,
          skip: 0,
          currentPage: 1
        }
      } else {
        departments.value = []
        pagination.value = {
          total: 0,
          limit: 10,
          skip: 0,
          currentPage: 1
        }
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch departments'
      handleAuthError(err)
    } finally {
      loading.value = false
    }
  }

  const fetchDepartment = async (id: number) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await companyDepartmentsControllers.getCompanyDepartment(id)
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch department'
      handleAuthError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const createDepartment = async (departmentData: CreateCompanyDepartment) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await companyDepartmentsControllers.createCompanyDepartment(departmentData)
      await fetchDepartments() // Refresh the list
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to create department'
      handleAuthError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateDepartment = async (id: number, departmentData: UpdateCompanyDepartment) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await companyDepartmentsControllers.updateCompanyDepartment(id, departmentData)
      await fetchDepartments() // Refresh the list
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to update department'
      handleAuthError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteDepartment = async (id: number) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await companyDepartmentsControllers.deleteCompanyDepartment(id)
      await fetchDepartments() // Refresh the list
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to delete department'
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
    departments,
    loading,
    error,
    pagination,
    
    // Getters
    getDepartments,
    getLoading,
    getError,
    getPagination,
    
    // Actions
    fetchDepartments,
    fetchDepartment,
    createDepartment,
    updateDepartment,
    deleteDepartment,
    setPage,
    setLimit,
    clearError
  }
}, {
  persist: true
}) 