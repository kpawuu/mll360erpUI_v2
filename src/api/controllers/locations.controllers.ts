import { locationsService } from '../services/locations.service'
import type { CreateLocationsData, UpdateLocationsData } from '../models/locations.model'
import { useAuthStore } from '../../store/auth.store'
import { authenticateFeathersClient } from '../feathers'

export const locationsControllers = {
  // Get all locations with optional query parameters
  async getLocations(params?: { query?: any }) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      const response = await locationsService.find(params)
      return response
    } catch (error) {
      console.error('Error fetching locations:', error)
      throw error
    }
  },

  // Get a single location by ID
  async getLocation(id: number) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      const response = await locationsService.get(id)
      return response
    } catch (error) {
      console.error('Error fetching location:', error)
      throw error
    }
  },

  // Create a new location
  async createLocation(locationData: CreateLocationsData) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      const response = await locationsService.create(locationData)
      return response
    } catch (error) {
      console.error('Error creating location:', error)
      throw error
    }
  },

  // Update an existing location
  async updateLocation(id: number, locationData: UpdateLocationsData) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      const response = await locationsService.patch(id, locationData)
      return response
    } catch (error) {
      console.error('Error updating location:', error)
      throw error
    }
  },

  // Delete a location
  async deleteLocation(id: number) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      const response = await locationsService.remove(id)
      return response
    } catch (error) {
      console.error('Error deleting location:', error)
      throw error
    }
  }
} 