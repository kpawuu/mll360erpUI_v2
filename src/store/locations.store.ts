import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { locationsControllers } from '../api/controllers/locations.controllers'
import type { Locations, CreateLocationsData, UpdateLocationsData } from '../api/models/locations.model'

export const useLocationsStore = defineStore('locations', () => {
  // State
  const locations = ref<Locations[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const getLocations = computed(() => locations.value)
  const getLoading = computed(() => loading.value)
  const getError = computed(() => error.value)

  // Actions
  const fetchLocations = async (params?: { query?: any }) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await locationsControllers.getLocations(params)
      
      if (response && response.data) {
        locations.value = response.data
      } else if (Array.isArray(response)) {
        locations.value = response
      } else {
        locations.value = []
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch locations'
      handleAuthError(err)
    } finally {
      loading.value = false
    }
  }

  const createLocation = async (locationData: CreateLocationsData) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await locationsControllers.createLocation(locationData)
      await fetchLocations() // Refresh the list
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to create location'
      handleAuthError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateLocation = async (id: number, locationData: UpdateLocationsData) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await locationsControllers.updateLocation(id, locationData)
      await fetchLocations() // Refresh the list
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to update location'
      handleAuthError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteLocation = async (id: number) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await locationsControllers.deleteLocation(id)
      await fetchLocations() // Refresh the list
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to delete location'
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
    locations,
    loading,
    error,
    
    // Getters
    getLocations,
    getLoading,
    getError,
    
    // Actions
    fetchLocations,
    createLocation,
    updateLocation,
    deleteLocation,
    clearError
  }
}, {
  persist: true
}) 