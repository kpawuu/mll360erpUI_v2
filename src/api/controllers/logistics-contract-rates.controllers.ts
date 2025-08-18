import feathersClient from '../feathers'
import type { CreateLogisticsContractRate, UpdateLogisticsContractRate } from '../models/logistics-contract-rates.model'

export const logisticsContractRatesControllers = {
  // Get all rates with optional query parameters
  async getLogisticsContractRates(params?: { query?: any }) {
    try {
      const response = await feathersClient.service('logistics-contract-rates').find(params)
      return response
    } catch (error) {
      console.error('Error fetching logistics contract rates:', error)
      throw error
    }
  },

  // Get a single rate by ID
  async getLogisticsContractRate(id: number) {
    try {
      const response = await feathersClient.service('logistics-contract-rates').get(id)
      return response
    } catch (error) {
      console.error('Error fetching logistics contract rate:', error)
      throw error
    }
  },

  // Create a new rate
  async createLogisticsContractRate(data: CreateLogisticsContractRate) {
    try {
      const response = await feathersClient.service('logistics-contract-rates').create(data)
      return response
    } catch (error) {
      console.error('Error creating logistics contract rate:', error)
      throw error
    }
  },

  // Update an existing rate
  async updateLogisticsContractRate(id: number, data: UpdateLogisticsContractRate) {
    try {
      const response = await feathersClient.service('logistics-contract-rates').patch(id, data)
      return response
    } catch (error) {
      console.error('Error updating logistics contract rate:', error)
      throw error
    }
  },

  // Delete a rate
  async deleteLogisticsContractRate(id: number) {
    try {
      const response = await feathersClient.service('logistics-contract-rates').remove(id)
      return response
    } catch (error) {
      console.error('Error deleting logistics contract rate:', error)
      throw error
    }
  },

  // Get rates by opportunity
  async getRatesByOpportunity(opportunityId: number) {
    try {
      const response = await feathersClient.service('logistics-contract-rates').find({
        query: {
          opportunity_id: opportunityId,
          $sort: { created_at: -1 }
        }
      })
      return response
    } catch (error) {
      console.error('Error fetching rates by opportunity:', error)
      throw error
    }
  },

  // Get active rates by service category
  async getActiveRatesByCategory(category: string) {
    try {
      const response = await feathersClient.service('logistics-contract-rates').find({
        query: {
          service_category: category,
          is_active: true,
          $sort: { created_at: -1 }
        }
      })
      return response
    } catch (error) {
      console.error('Error fetching active rates by category:', error)
      throw error
    }
  },

  // Bulk create rates
  async bulkCreateRates(rates: CreateLogisticsContractRate[]) {
    try {
      const responses = []
      for (const rate of rates) {
        const response = await feathersClient.service('logistics-contract-rates').create(rate)
        responses.push(response)
      }
      return responses
    } catch (error) {
      console.error('Error bulk creating rates:', error)
      throw error
    }
  },

  // Toggle rate status
  async toggleRateStatus(id: number) {
    try {
      const rate = await feathersClient.service('logistics-contract-rates').get(id)
      const response = await feathersClient.service('logistics-contract-rates').patch(id, {
        is_active: !rate.is_active
      })
      return response
    } catch (error) {
      console.error('Error toggling rate status:', error)
      throw error
    }
  }
}
