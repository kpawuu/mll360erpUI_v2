import { shipmentTypeService } from '../services/shipment-type.service'
import type { ShipmentType, CreateShipmentType, UpdateShipmentType } from '../models/shipment-type.model'
import { useAuthStore } from '../../store/auth.store'
import { authenticateFeathersClient } from '../feathers'

export const shipmentTypeControllers = {
  // Get all shipment types with optional query parameters
  async getShipmentTypes(params?: { query?: any }) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      const response = await shipmentTypeService.find(params)
      return response
    } catch (error) {
      console.error('Error fetching shipment types:', error)
      throw error
    }
  },

  // Get a single shipment type by ID
  async getShipmentType(id: number) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      const response = await shipmentTypeService.get(id)
      return response
    } catch (error) {
      console.error('Error fetching shipment type:', error)
      throw error
    }
  },

  // Create a new shipment type
  async createShipmentType(shipmentTypeData: CreateShipmentType) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      const response = await shipmentTypeService.create(shipmentTypeData)
      return response
    } catch (error) {
      console.error('Error creating shipment type:', error)
      throw error
    }
  },

  // Update an existing shipment type
  async updateShipmentType(id: number, shipmentTypeData: UpdateShipmentType) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      const response = await shipmentTypeService.patch(id, shipmentTypeData)
      return response
    } catch (error) {
      console.error('Error updating shipment type:', error)
      throw error
    }
  },

  // Delete a shipment type
  async deleteShipmentType(id: number) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      const response = await shipmentTypeService.remove(id)
      return response
    } catch (error) {
      console.error('Error deleting shipment type:', error)
      throw error
    }
  }
} 