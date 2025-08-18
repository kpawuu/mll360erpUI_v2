import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fileControllers } from '../api/controllers/file.controllers'
import type { File, CreateFile, UpdateFile } from '../api/models/file.model'

export const useFileStore = defineStore('file', () => {
  // State
  const files = ref<File[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const pagination = ref({
    total: 0,
    limit: 10,
    skip: 0,
    currentPage: 1
  })

  // Getters
  const getFiles = computed(() => files.value)
  const getLoading = computed(() => loading.value)
  const getError = computed(() => error.value)
  const getPagination = computed(() => pagination.value)

  // Actions
  const fetchFiles = async (params?: { query?: any }) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fileControllers.getFiles(params)
      
      if (response && response.data) {
        files.value = response.data
        pagination.value = {
          total: response.total || 0,
          limit: response.limit || 10,
          skip: response.skip || 0,
          currentPage: Math.floor((response.skip || 0) / (response.limit || 10)) + 1
        }
      } else if (Array.isArray(response)) {
        files.value = response
        pagination.value = {
          total: response.length,
          limit: response.length,
          skip: 0,
          currentPage: 1
        }
      } else {
        files.value = []
        pagination.value = {
          total: 0,
          limit: 10,
          skip: 0,
          currentPage: 1
        }
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch files'
      console.error('Error in fetchFiles:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchFile = async (id: number) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fileControllers.getFile(id)
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch file'
      console.error('Error in fetchFile:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const createFile = async (data: CreateFile) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fileControllers.createFile(data)
      // Refresh the files list
      await fetchFiles()
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to create file'
      console.error('Error in createFile:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateFile = async (id: number, data: UpdateFile) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fileControllers.updateFile(id, data)
      // Update the file in the local state
      const index = files.value.findIndex(file => file.id === id)
      if (index !== -1) {
        files.value[index] = { ...files.value[index], ...response }
      }
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to update file'
      console.error('Error in updateFile:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteFile = async (id: number) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fileControllers.deleteFile(id)
      // Remove the file from the local state
      files.value = files.value.filter(file => file.id !== id)
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to delete file'
      console.error('Error in deleteFile:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const uploadFile = async (file: globalThis.File, entityType: string, entityId: number, additionalData: any = {}) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fileControllers.uploadFile(file, entityType, entityId, additionalData)
      // Refresh the files list after upload
      await fetchFiles()
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to upload file'
      console.error('Error in uploadFile:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const getFilesForEntity = async (entityType: string, entityId: number, options?: { 
    fileType?: string, 
    limit?: number, 
    sort?: string 
  }) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fileControllers.getFilesForEntity(entityType, entityId, options)
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch files for entity'
      console.error('Error in getFilesForEntity:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const getImagesForEntity = async (entityType: string, entityId: number, limit?: number) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fileControllers.getImagesForEntity(entityType, entityId, limit)
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch images for entity'
      console.error('Error in getImagesForEntity:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const getDocumentsForEntity = async (entityType: string, entityId: number, limit?: number) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fileControllers.getDocumentsForEntity(entityType, entityId, limit)
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch documents for entity'
      console.error('Error in getDocumentsForEntity:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const getLatestFileForEntity = async (entityType: string, entityId: number, fileType?: string) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fileControllers.getLatestFileForEntity(entityType, entityId, fileType)
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch latest file for entity'
      console.error('Error in getLatestFileForEntity:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const getCompanyLogo = async (companyId: number) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fileControllers.getCompanyLogo(companyId)
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch company logo'
      console.error('Error in getCompanyLogo:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const getUserProfilePicture = async (userId: number) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fileControllers.getUserProfilePicture(userId)
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch user profile picture'
      console.error('Error in getUserProfilePicture:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const getOpportunityDocuments = async (opportunityId: number) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fileControllers.getOpportunityDocuments(opportunityId)
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch opportunity documents'
      console.error('Error in getOpportunityDocuments:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const getInvoiceAttachments = async (invoiceId: number) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fileControllers.getInvoiceAttachments(invoiceId)
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch invoice attachments'
      console.error('Error in getInvoiceAttachments:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const clearError = () => {
    error.value = null
  }

  const clearFiles = () => {
    files.value = []
    pagination.value = {
      total: 0,
      limit: 10,
      skip: 0,
      currentPage: 1
    }
  }

                return {
                // State
                files,
                loading,
                error,
                pagination,
                
                // Getters
                getFiles,
                getLoading,
                getError,
                getPagination,
                
                // Actions
                fetchFiles,
                fetchFile,
                createFile,
                updateFile,
                deleteFile,
                uploadFile,
                getFilesForEntity,
                getImagesForEntity,
                getDocumentsForEntity,
                getLatestFileForEntity,
                getCompanyLogo,
                getUserProfilePicture,
                getOpportunityDocuments,
                getInvoiceAttachments,
                clearError,
                clearFiles
              }
})
