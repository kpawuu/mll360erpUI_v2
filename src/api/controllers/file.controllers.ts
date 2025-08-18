import feathersClient from '../feathers'
import type { File, CreateFile, UpdateFile } from '../models/file.model'
import { useAuthStore } from '../../store/auth.store'
import { authenticateFeathersClient } from '../feathers'
import { fileService } from '../services/file.service'

export const fileControllers = {
  // Get all files with optional query parameters
  async getFiles(params?: { query?: any }) {
    const authStore = useAuthStore() as any
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      const response = await fileService.find(params)
      return response
    } catch (error) {
      console.error('Error fetching files:', error)
      throw error
    }
  },

  // Get a single file by ID
  async getFile(id: number) {
    const authStore = useAuthStore() as any
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      const response = await fileService.get(id)
      return response
    } catch (error) {
      console.error('Error fetching file:', error)
      throw error
    }
  },

  // Create a new file
  async createFile(data: CreateFile) {
    const authStore = useAuthStore() as any
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      const response = await fileService.create(data)
      return response
    } catch (error) {
      console.error('Error creating file:', error)
      throw error
    }
  },

  // Update a file
  async updateFile(id: number, data: UpdateFile) {
    const authStore = useAuthStore() as any
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      const response = await fileService.patch(id, data)
      return response
    } catch (error) {
      console.error('Error updating file:', error)
      throw error
    }
  },

  // Delete a file
  async deleteFile(id: number) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      const response = await fileService.remove(id)
      return response
    } catch (error) {
      console.error('Error deleting file:', error)
      throw error
    }
  },

  // Generic file upload to files-uploader service
  async uploadFile(file: globalThis.File, entityType: string, entityId: number, additionalData: any = {}) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      
      const formData = new FormData()
      formData.append('file', file)
      formData.append('entityName', entityType)
      formData.append('entityId', entityId.toString())
      
      // Add any additional data
      Object.keys(additionalData).forEach(key => {
        formData.append(key, additionalData[key])
      })

      // Get the backend URL from environment variable
      const backendUrl = import.meta.env.VITE_API_URL || ''
      const uploadUrl = `${backendUrl}/file-upload`
      
      console.log('Upload URL:', uploadUrl)
      console.log('Backend URL:', backendUrl)
      console.log('Environment VITE_API_URL:', import.meta.env.VITE_API_URL)
      
      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${feathersClient.authentication.getAccessToken()}`
        }
      })

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`)
      }

      const result = await response.json()
      return result
    } catch (error) {
      console.error('Error uploading file:', error)
      throw error
    }
  },

  // Get files for a specific entity
  async getFilesForEntity(entityType: string, entityId: number, options?: { 
    fileType?: string, 
    limit?: number, 
    sort?: string 
  }) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      
      const query: any = {
        entity_type: entityType,
        entity_id: entityId,
        $sort: { date_created: -1 }
      }

      // Add file type filter if specified
      if (options?.fileType) {
        // Use exact match for now to avoid $like validation issues
        query.file_type = options.fileType
      }

      // Add limit if specified
      if (options?.limit) {
        query.$limit = options.limit
      }

      // Override sort if specified
      if (options?.sort) {
        query.$sort = options.sort
      }

      const response = await fileService.find({ query })
      return response
    } catch (error) {
      console.error('Error fetching files for entity:', error)
      throw error
    }
  },

  // Get images for a specific entity
  async getImagesForEntity(entityType: string, entityId: number, limit?: number) {
    const authStore = useAuthStore() as any
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      
      const query: any = {
        entity_type: entityType,
        entity_id: entityId,
        $sort: { date_created: -1 }
      }

      // Filter for image files
      query.file_type = { $like: 'image%' }

      if (limit) {
        query.$limit = limit
      }

      const response = await fileService.find({ query: query as any })
      return response
    } catch (error) {
      console.error('Error fetching images for entity:', error)
      throw error
    }
  },

  // Get documents for a specific entity
  async getDocumentsForEntity(entityType: string, entityId: number, limit?: number) {
    const authStore = useAuthStore() as any
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      
      const query: any = {
        entity_type: entityType,
        entity_id: entityId,
        $sort: { date_created: -1 }
      }

      // Filter for document files
      query.file_type = { $like: 'application%' }

      if (limit) {
        query.$limit = limit
      }

      const response = await fileService.find({ query: query as any })
      return response
    } catch (error) {
      console.error('Error fetching documents for entity:', error)
      throw error
    }
  },

  // Get the most recent file of a specific type for an entity
  async getLatestFileForEntity(entityType: string, entityId: number, fileType?: string) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    
    try {
      await authenticateFeathersClient()
      
      const files = await this.getFilesForEntity(entityType, entityId, { 
        fileType, 
        limit: 1 
      })
      
      if (files && files.data && files.data.length > 0) {
        return files.data[0]
      }
      return null
    } catch (error) {
      console.error('Error fetching latest file for entity:', error)
      throw error
    }
  },

  // Get company logo (specific convenience method)
  async getCompanyLogo(companyId: number) {
    return this.getLatestFileForEntity('company', companyId, 'image')
  },

  // Get user profile picture (specific convenience method)
  async getUserProfilePicture(userId: number) {
    return this.getLatestFileForEntity('users', userId, 'image')
  },

  // Get opportunity documents (specific convenience method)
  async getOpportunityDocuments(opportunityId: number) {
    return this.getDocumentsForEntity('opportunities', opportunityId)
  },

  // Get invoice attachments (specific convenience method)
  async getInvoiceAttachments(invoiceId: number) {
    return this.getFilesForEntity('logistics-contract-invoices', invoiceId)
  }
}
