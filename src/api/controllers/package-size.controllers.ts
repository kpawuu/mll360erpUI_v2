import { packageSizeService } from '../services/package-size.service'
import type { PackageSize, CreatePackageSize, UpdatePackageSize } from '../models/package-size.model'
import { useAuthStore } from '../../store/auth.store'
import { authenticateFeathersClient } from '../feathers'

export const packageSizeControllers = {
  // Get all package sizes with optional query parameters
  async getPackageSizes(params?: { query?: any }) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      const response = await packageSizeService.find(params)
      return response
    } catch (error) {
      console.error('Error fetching package sizes:', error)
      throw error
    }
  },

  // Get a single package size by ID
  async getPackageSize(id: number) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      const response = await packageSizeService.get(id)
      return response
    } catch (error) {
      console.error('Error fetching package size:', error)
      throw error
    }
  },

  // Create a new package size
  async createPackageSize(packageSizeData: CreatePackageSize) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      const response = await packageSizeService.create(packageSizeData)
      return response
    } catch (error) {
      console.error('Error creating package size:', error)
      throw error
    }
  },

  // Update an existing package size
  async updatePackageSize(id: number, packageSizeData: UpdatePackageSize) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      const response = await packageSizeService.patch(id, packageSizeData)
      return response
    } catch (error) {
      console.error('Error updating package size:', error)
      throw error
    }
  },

  // Delete a package size
  async deletePackageSize(id: number) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      const response = await packageSizeService.remove(id)
      return response
    } catch (error) {
      console.error('Error deleting package size:', error)
      throw error
    }
  }
} 