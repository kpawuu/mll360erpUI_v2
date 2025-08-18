import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getActivities, getActivity, createActivity, updateActivity, deleteActivity } from '../api/controllers/activities.controllers'
import type { Activity, CreateActivity, UpdateActivity } from '../api/models/activities.model'
import { useAuthStore } from './auth.store'

export const useActivitiesStore = defineStore('activities', () => {
  const authStore = useAuthStore()
  
  // State
  const activities = ref<Activity[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const pagination = ref({
    total: 0,
    limit: 10,
    skip: 0,
    currentPage: 1
  })

  // Getters
  const getActivitiesList = computed(() => activities.value)
  const getLoading = computed(() => loading.value)
  const getError = computed(() => error.value)
  const getPagination = computed(() => pagination.value)

  // Get total pages
  const getTotalPages = computed(() => {
    return Math.ceil(pagination.value.total / pagination.value.limit)
  })

  // Actions
  const fetchActivities = async (params?: any) => {
    try {
      loading.value = true
      error.value = null
      
      // Clear existing activities before fetching new ones
      activities.value = []
      
      // Ensure we always filter by company_id for security
      const query = {
        ...params,
        company_id: authStore.user?.company_id
      }
      
      console.log('🏪 Activities Store - Fetching with query:', query)
      console.log('🏪 Activities Store - User company_id:', authStore.user?.company_id)
      
      const result = await getActivities(query)
      
      console.log('🏪 Activities Store - API response:', result)
      console.log('🏪 Activities Store - Activities data:', result.data)
      
      // Ensure we only get activities for the user's company
      const filteredActivities = (result.data || []).filter((activity: any) => 
        activity.company_id === authStore.user?.company_id
      )
      
      if (filteredActivities.length !== (result.data || []).length) {
        console.warn('🏪 Activities Store - Some activities were filtered out due to company mismatch:', {
          original: (result.data || []).length,
          filtered: filteredActivities.length
        })
      }
      
      activities.value = filteredActivities
      pagination.value = {
        total: result.total || 0,
        limit: result.limit || 10,
        skip: result.skip || 0,
        currentPage: Math.floor((result.skip || 0) / (result.limit || 10)) + 1
      }
      
      console.log('🏪 Activities Store - Final activities array:', activities.value)
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch activities'
      console.error('Error fetching activities:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchActivity = async (id: number) => {
    try {
      loading.value = true
      error.value = null
      return await getActivity(id)
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch activity'
      console.error('Error fetching activity:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const createNewActivity = async (data: CreateActivity) => {
    try {
      loading.value = true
      error.value = null
      
      const activityData = {
        ...data,
        company_id: authStore.user?.company_id
      }
      
      const result = await createActivity(activityData)
      activities.value.unshift(result)
      return result
    } catch (err: any) {
      error.value = err.message || 'Failed to create activity'
      console.error('Error creating activity:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateExistingActivity = async (id: number, data: UpdateActivity) => {
    try {
      loading.value = true
      error.value = null
      
      const result = await updateActivity(id, data)
      const index = activities.value.findIndex(activity => activity.id === id)
      if (index !== -1) {
        activities.value[index] = result
      }
      return result
    } catch (err: any) {
      error.value = err.message || 'Failed to update activity'
      console.error('Error updating activity:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteExistingActivity = async (id: number) => {
    try {
      loading.value = true
      error.value = null
      
      await deleteActivity(id)
      activities.value = activities.value.filter(activity => activity.id !== id)
    } catch (err: any) {
      error.value = err.message || 'Failed to delete activity'
      console.error('Error deleting activity:', err)
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

  const handleAuthError = () => {
    error.value = 'Authentication required'
  }

  return {
    // State
    activities,
    loading,
    error,
    pagination,
    
    // Getters
    getActivitiesList,
    getLoading,
    getError,
    getPagination,
    getTotalPages,
    
    // Actions
    fetchActivities,
    fetchActivity,
    createNewActivity,
    updateExistingActivity,
    deleteExistingActivity,
    
    // Pagination
    setPage,
    setLimit,
    
    // Error handling
    clearError,
    handleAuthError
  }
}, {
  persist: false
}) 