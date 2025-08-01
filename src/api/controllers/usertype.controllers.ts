import { usertypeService } from '../services/usertype.service'
import type { Usertype, CreateUsertype, UpdateUsertype } from '../models/usertype.model'
import { useAuthStore } from '../../store/auth.store'
import { authenticateFeathersClient } from '../feathers'

export const usertypeControllers = {
  // Get all usertypes with optional query parameters
  async getUsertypes(params?: { query?: any }) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }

    try {
      // Ensure Feathers client is authenticated
      await authenticateFeathersClient()
      const response = await usertypeService.find(params)
      return response
    } catch (error) {
      console.error('Error fetching usertypes:', error)
      throw error
    }
  },

  // Get a single usertype by ID
  async getUsertype(id: number) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }

    try {
      // Ensure Feathers client is authenticated
      await authenticateFeathersClient()
      const response = await usertypeService.get(id)
      return response
    } catch (error) {
      console.error('Error fetching usertype:', error)
      throw error
    }
  },

  // Create a new usertype
  async createUsertype(usertypeData: CreateUsertype) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }

    try {
      // Ensure Feathers client is authenticated
      await authenticateFeathersClient()
      const response = await usertypeService.create(usertypeData)
      return response
    } catch (error) {
      console.error('Error creating usertype:', error)
      throw error
    }
  },

  // Update an existing usertype
  async updateUsertype(id: number, usertypeData: UpdateUsertype) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }

    try {
      // Ensure Feathers client is authenticated
      await authenticateFeathersClient()
      const response = await usertypeService.patch(id, usertypeData)
      return response
    } catch (error) {
      console.error('Error updating usertype:', error)
      throw error
    }
  },

  // Delete a usertype
  async deleteUsertype(id: number) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }

    try {
      // Ensure Feathers client is authenticated
      await authenticateFeathersClient()
      const response = await usertypeService.remove(id)
      return response
    } catch (error) {
      console.error('Error deleting usertype:', error)
      throw error
    }
  }
} 