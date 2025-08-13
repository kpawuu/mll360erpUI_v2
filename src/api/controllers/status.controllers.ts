import { statusService } from '../services/status.service'
import type { CreateStatus, UpdateStatus } from '../models/status.model'
import { useAuthStore } from '../../store/auth.store'
import { authenticateFeathersClient } from '../feathers'

export const statusControllers = {
  // Get all statuses with optional query parameters
  async getStatuses(params?: { query?: any }) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      const response = await statusService.find(params)
      return response
    } catch (error) {
      console.error('Error fetching statuses:', error)
      throw error
    }
  },

  // Get a single status by ID
  async getStatus(id: number) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      const response = await statusService.get(id)
      return response
    } catch (error) {
      console.error('Error fetching status:', error)
      throw error
    }
  },

  // Create a new status
  async createStatus(statusData: CreateStatus) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      const response = await statusService.create(statusData)
      return response
    } catch (error) {
      console.error('Error creating status:', error)
      throw error
    }
  },

  // Update an existing status
  async updateStatus(id: number, statusData: UpdateStatus) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      const response = await statusService.patch(id, statusData)
      return response
    } catch (error) {
      console.error('Error updating status:', error)
      throw error
    }
  },

  // Delete a status
  async deleteStatus(id: number) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      const response = await statusService.remove(id)
      return response
    } catch (error) {
      console.error('Error deleting status:', error)
      throw error
    }
  }
} 