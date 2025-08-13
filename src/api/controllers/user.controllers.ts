import { userService } from '../services/user.service'
import type { CreateUser, UpdateUser } from '../models/user.model'
import { useAuthStore } from '../../store/auth.store'
import { authenticateFeathersClient } from '../feathers'

export const userControllers = {
  // Get all users with optional query parameters
  async getUsers(params?: { query?: any }) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      // Ensure Feathers client is authenticated
      await authenticateFeathersClient()
      const response = await userService.find(params)
      return response
    } catch (error) {
      console.error('Error fetching users:', error)
      throw error
    }
  },

  // Get a single user by ID
  async getUser(id: number) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      // Ensure Feathers client is authenticated
      await authenticateFeathersClient()
      const response = await userService.get(id)
      return response
    } catch (error) {
      console.error('Error fetching user:', error)
      throw error
    }
  },

  // Create a new user
  async createUser(userData: CreateUser) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      // Ensure Feathers client is authenticated
      await authenticateFeathersClient()
      const response = await userService.create(userData)
      return response
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    }
  },

  // Update an existing user
  async updateUser(id: number, userData: UpdateUser) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      // Ensure Feathers client is authenticated
      await authenticateFeathersClient()
      const response = await userService.patch(id, userData)
      return response
    } catch (error) {
      console.error('Error updating user:', error)
      throw error
    }
  },

  // Delete a user
  async deleteUser(id: number) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      // Ensure Feathers client is authenticated
      await authenticateFeathersClient()
      const response = await userService.remove(id)
      return response
    } catch (error) {
      console.error('Error deleting user:', error)
      throw error
    }
  }
} 