import feathersClient from '../feathers'
import type { CreateAuditlogs, UpdateAuditlogs } from '../models/auditlogs.model'

export const auditlogsControllers = {
  // Get all audit logs with optional query parameters
  getAuditlogs: async (params?: { query?: any }) => {
    try {
      console.log('🔍 Audit logs controller - getAuditlogs called with params:', params)
      const response = await feathersClient.service('auditlogs').find(params)
      console.log('📡 Audit logs controller - API response:', response)
      return response
    } catch (error) {
      console.error('❌ Audit logs controller - Error fetching audit logs:', error)
      throw error
    }
  },

  // Get a single audit log by ID
  getAuditlog: async (id: number) => {
    try {
      console.log('🔍 Audit logs controller - getAuditlog called with id:', id)
      const response = await feathersClient.service('auditlogs').get(id)
      console.log('📡 Audit logs controller - API response:', response)
      return response
    } catch (error) {
      console.error('❌ Audit logs controller - Error fetching audit log:', error)
      throw error
    }
  },

  // Create a new audit log
  createAuditlog: async (data: CreateAuditlogs) => {
    try {
      console.log('🔍 Audit logs controller - createAuditlog called with data:', data)
      const response = await feathersClient.service('auditlogs').create(data)
      console.log('📡 Audit logs controller - API response:', response)
      return response
    } catch (error) {
      console.error('❌ Audit logs controller - Error creating audit log:', error)
      throw error
    }
  },

  // Update an audit log
  updateAuditlog: async (id: number, data: UpdateAuditlogs) => {
    try {
      console.log('🔍 Audit logs controller - updateAuditlog called with id:', id, 'data:', data)
      const response = await feathersClient.service('auditlogs').patch(id, data)
      console.log('📡 Audit logs controller - API response:', response)
      return response
    } catch (error) {
      console.error('❌ Audit logs controller - Error updating audit log:', error)
      throw error
    }
  },

  // Delete an audit log
  deleteAuditlog: async (id: number) => {
    try {
      console.log('🔍 Audit logs controller - deleteAuditlog called with id:', id)
      const response = await feathersClient.service('auditlogs').remove(id)
      console.log('📡 Audit logs controller - API response:', response)
      return response
    } catch (error) {
      console.error('❌ Audit logs controller - Error deleting audit log:', error)
      throw error
    }
  }
} 