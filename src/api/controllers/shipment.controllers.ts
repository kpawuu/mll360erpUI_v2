import { shipmentService } from '../services/shipment.service'
import type { Shipment, CreateShipment, UpdateShipment } from '../models/shipment.model'
import { useAuthStore } from '../../store/auth.store'
import { authenticateFeathersClient } from '../feathers'

export const shipmentControllers = {
  // Get all shipments with optional query parameters
  async getShipments(params?: { query?: any }) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      const response = await shipmentService.find(params)
      return response
    } catch (error) {
      console.error('Error fetching shipments:', error)
      throw error
    }
  },

  // Get a single shipment by ID
  async getShipment(id: number) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      const response = await shipmentService.get(id)
      return response
    } catch (error) {
      console.error('Error fetching shipment:', error)
      throw error
    }
  },

  // Create a new shipment
  async createShipment(shipmentData: CreateShipment) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      const response = await shipmentService.create(shipmentData)
      return response
    } catch (error) {
      console.error('Error creating shipment:', error)
      throw error
    }
  },

  // Update an existing shipment
  async updateShipment(id: number, shipmentData: UpdateShipment) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      const response = await shipmentService.patch(id, shipmentData)
      return response
    } catch (error) {
      console.error('Error updating shipment:', error)
      throw error
    }
  },

  // Delete a shipment
  async deleteShipment(id: number) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      const response = await shipmentService.remove(id)
      return response
    } catch (error) {
      console.error('Error deleting shipment:', error)
      throw error
    }
  }
} 