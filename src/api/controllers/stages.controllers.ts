import feathersClient from '../feathers'
import type { CreateStages, UpdateStages } from '../models/stages.model'

export const stagesControllers = {
  // Get all stages with optional query parameters
  async getStages(params?: { query?: any }) {
    try {
      const response = await feathersClient.service('crm/stages').find(params)
      return response
    } catch (error) {
      console.error('Error fetching stages:', error)
      throw error
    }
  },

  // Get a single stage by ID
  async getStage(id: number) {
    try {
      const response = await feathersClient.service('crm/stages').get(id)
      return response
    } catch (error) {
      console.error('Error fetching stage:', error)
      throw error
    }
  },

  // Create a new stage
  async createStage(data: CreateStages) {
    try {
      const response = await feathersClient.service('crm/stages').create(data)
      return response
    } catch (error) {
      console.error('Error creating stage:', error)
      throw error
    }
  },

  // Update an existing stage
  async updateStage(id: number, data: UpdateStages) {
    try {
      const response = await feathersClient.service('crm/stages').patch(id, data)
      return response
    } catch (error) {
      console.error('Error updating stage:', error)
      throw error
    }
  },

  // Delete a stage
  async deleteStage(id: number) {
    try {
      const response = await feathersClient.service('crm/stages').remove(id)
      return response
    } catch (error) {
      console.error('Error deleting stage:', error)
      throw error
    }
  }
} 