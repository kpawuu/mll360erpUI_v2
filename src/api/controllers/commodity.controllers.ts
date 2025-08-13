import { commodityService } from '../services/commodity.service'
import type { CreateCommodity, UpdateCommodity } from '../models/commodity.model'
import { useAuthStore } from '../../store/auth.store'
import { authenticateFeathersClient } from '../feathers'

export const commodityControllers = {
  // Get all commodities with optional query parameters
  async getCommodities(params?: { query?: any }) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      const response = await commodityService.find(params)
      return response
    } catch (error) {
      console.error('Error fetching commodities:', error)
      throw error
    }
  },

  // Get a single commodity by ID
  async getCommodity(id: number) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      const response = await commodityService.get(id)
      return response
    } catch (error) {
      console.error('Error fetching commodity:', error)
      throw error
    }
  },

  // Create a new commodity
  async createCommodity(commodityData: CreateCommodity) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      const response = await commodityService.create(commodityData)
      return response
    } catch (error) {
      console.error('Error creating commodity:', error)
      throw error
    }
  },

  // Update an existing commodity
  async updateCommodity(id: number, commodityData: UpdateCommodity) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      const response = await commodityService.patch(id, commodityData)
      return response
    } catch (error) {
      console.error('Error updating commodity:', error)
      throw error
    }
  },

  // Delete a commodity
  async deleteCommodity(id: number) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      const response = await commodityService.remove(id)
      return response
    } catch (error) {
      console.error('Error deleting commodity:', error)
      throw error
    }
  }
} 