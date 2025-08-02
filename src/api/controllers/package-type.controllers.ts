import { packageTypeService } from '../services/package-type.service'
import type { PackageType, CreatePackageType, UpdatePackageType } from '../models/package-type.model'
import { useAuthStore } from '../../store/auth.store'
import { authenticateFeathersClient } from '../feathers'

export const packageTypeControllers = {
  // Get all package types with optional query parameters
  async getPackageTypes(params?: { query?: any }) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      const response = await packageTypeService.find(params)
      return response
    } catch (error) {
      console.error('Error fetching package types:', error)
      throw error
    }
  },

  // Get a single package type by ID
  async getPackageType(id: number) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      const response = await packageTypeService.get(id)
      return response
    } catch (error) {
      console.error('Error fetching package type:', error)
      throw error
    }
  },

  // Create a new package type
  async createPackageType(packageTypeData: CreatePackageType) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      const response = await packageTypeService.create(packageTypeData)
      return response
    } catch (error) {
      console.error('Error creating package type:', error)
      throw error
    }
  },

  // Update an existing package type
  async updatePackageType(id: number, packageTypeData: UpdatePackageType) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      const response = await packageTypeService.patch(id, packageTypeData)
      return response
    } catch (error) {
      console.error('Error updating package type:', error)
      throw error
    }
  },

  // Delete a package type
  async deletePackageType(id: number) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      const response = await packageTypeService.remove(id)
      return response
    } catch (error) {
      console.error('Error deleting package type:', error)
      throw error
    }
  }
} 