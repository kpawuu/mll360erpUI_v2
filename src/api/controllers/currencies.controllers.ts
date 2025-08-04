import feathersClient from '../feathers'
import type { Currencies, CreateCurrencies, UpdateCurrencies } from '../models/currencies.model'

export const currenciesControllers = {
  // Get all currencies with optional query parameters
  async getCurrencies(params?: { query?: any }) {
    try {
      const response = await feathersClient.service('currencies').find(params)
      return response
    } catch (error) {
      console.error('Error fetching currencies:', error)
      throw error
    }
  },

  // Get a single currency by ID
  async getCurrency(id: number) {
    try {
      const response = await feathersClient.service('currencies').get(id)
      return response
    } catch (error) {
      console.error('Error fetching currency:', error)
      throw error
    }
  },

  // Create a new currency
  async createCurrency(data: CreateCurrencies) {
    try {
      const response = await feathersClient.service('currencies').create(data)
      return response
    } catch (error) {
      console.error('Error creating currency:', error)
      throw error
    }
  },

  // Update an existing currency
  async updateCurrency(id: number, data: UpdateCurrencies) {
    try {
      const response = await feathersClient.service('currencies').patch(id, data)
      return response
    } catch (error) {
      console.error('Error updating currency:', error)
      throw error
    }
  },

  // Delete a currency
  async deleteCurrency(id: number) {
    try {
      const response = await feathersClient.service('currencies').remove(id)
      return response
    } catch (error) {
      console.error('Error deleting currency:', error)
      throw error
    }
  }
} 