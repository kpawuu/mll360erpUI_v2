import feathersClient from '../feathers'
import type { EntityContactPerson, CreateEntityContactPerson, UpdateEntityContactPerson } from '../models/entity-contact-person.model'

export const entityContactPersonControllers = {
  // Get all contact persons with optional query parameters
  async getContactPersons(params?: { query?: any }) {
    try {
      const response = await feathersClient.service('entity-contact-person').find(params)
      return response
    } catch (error) {
      console.error('Error fetching contact persons:', error)
      throw error
    }
  },

  // Get a single contact person by ID
  async getContactPerson(id: number) {
    try {
      const response = await feathersClient.service('entity-contact-person').get(id)
      return response
    } catch (error) {
      console.error('Error fetching contact person:', error)
      throw error
    }
  },

  // Create a new contact person
  async createContactPerson(data: CreateEntityContactPerson) {
    try {
      const response = await feathersClient.service('entity-contact-person').create(data)
      return response
    } catch (error) {
      console.error('Error creating contact person:', error)
      throw error
    }
  },

  // Update an existing contact person
  async updateContactPerson(id: number, data: UpdateEntityContactPerson) {
    try {
      const response = await feathersClient.service('entity-contact-person').patch(id, data)
      return response
    } catch (error) {
      console.error('Error updating contact person:', error)
      throw error
    }
  },

  // Delete a contact person
  async deleteContactPerson(id: number) {
    try {
      const response = await feathersClient.service('entity-contact-person').remove(id)
      return response
    } catch (error) {
      console.error('Error deleting contact person:', error)
      throw error
    }
  }
} 