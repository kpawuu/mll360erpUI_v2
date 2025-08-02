import { packageUnitService } from '../services/package-unit.service'
import type { PackageUnit, CreatePackageUnit, UpdatePackageUnit } from '../models/package-unit.model'
import { useAuthStore } from '../../store/auth.store'
import { authenticateFeathersClient } from '../feathers'

export const packageUnitControllers = {
  // Get all package units with optional query parameters
  async getPackageUnits(params?: { query?: any }) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      const response = await packageUnitService.find(params)
      return response
    } catch (error) {
      console.error('Error fetching package units:', error)
      throw error
    }
  },

  // Get a single package unit by ID
  async getPackageUnit(id: number) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      const response = await packageUnitService.get(id)
      return response
    } catch (error) {
      console.error('Error fetching package unit:', error)
      throw error
    }
  },

  // Create a new package unit
  async createPackageUnit(packageUnitData: CreatePackageUnit) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      const response = await packageUnitService.create(packageUnitData)
      return response
    } catch (error) {
      console.error('Error creating package unit:', error)
      throw error
    }
  },

  // Update an existing package unit
  async updatePackageUnit(id: number, packageUnitData: UpdatePackageUnit) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      const response = await packageUnitService.patch(id, packageUnitData)
      return response
    } catch (error) {
      console.error('Error updating package unit:', error)
      throw error
    }
  },

  // Delete a package unit
  async deletePackageUnit(id: number) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      const response = await packageUnitService.remove(id)
      return response
    } catch (error) {
      console.error('Error deleting package unit:', error)
      throw error
    }
  }
} 