import feathersClient from '../feathers'
import type { Pipelines, CreatePipelines, UpdatePipelines } from '../models/pipelines.model'

export const pipelinesControllers = {
  // Get all pipelines with optional query parameters
  async getPipelines(params?: { query?: any }) {
    try {
      const response = await feathersClient.service('crm/pipelines').find(params)
      return response
    } catch (error) {
      console.error('Error fetching pipelines:', error)
      throw error
    }
  },

  // Get a single pipeline by ID
  async getPipeline(id: number) {
    try {
      const response = await feathersClient.service('crm/pipelines').get(id)
      return response
    } catch (error) {
      console.error('Error fetching pipeline:', error)
      throw error
    }
  },

  // Create a new pipeline
  async createPipeline(data: CreatePipelines) {
    try {
      const response = await feathersClient.service('crm/pipelines').create(data)
      return response
    } catch (error) {
      console.error('Error creating pipeline:', error)
      throw error
    }
  },

  // Update an existing pipeline
  async updatePipeline(id: number, data: UpdatePipelines) {
    try {
      const response = await feathersClient.service('crm/pipelines').patch(id, data)
      return response
    } catch (error) {
      console.error('Error updating pipeline:', error)
      throw error
    }
  },

  // Delete a pipeline
  async deletePipeline(id: number) {
    try {
      const response = await feathersClient.service('crm/pipelines').remove(id)
      return response
    } catch (error) {
      console.error('Error deleting pipeline:', error)
      throw error
    }
  }
} 