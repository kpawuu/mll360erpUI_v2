import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { auditlogsControllers } from '../api/controllers/auditlogs.controllers'
import type { Auditlogs } from '../api/models/auditlogs.model'
import { useAuthStore } from './auth.store'

export const useAuditlogsStore = defineStore('auditlogs', () => {
  // State
  const auditlogs = ref<Auditlogs[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const pagination = ref({
    total: 0,
    limit: 10,
    skip: 0,
    currentPage: 1
  })

  // Get auth store for user company info
  const authStore = useAuthStore()

  // Getters
  const getAuditlogs = computed(() => auditlogs.value)
  const getLoading = computed(() => loading.value)
  const getError = computed(() => error.value)
           const getPagination = computed(() => pagination.value)

         // Get total pages
         const getTotalPages = computed(() => {
           return Math.ceil(pagination.value.total / pagination.value.limit)
         })

         // Get user's company ID
  const getUserCompanyId = computed(() => {
    return authStore.user?.company_id || null
  })

  // Get recent activity for dashboard
  const getRecentActivity = computed(() => {
    return auditlogs.value.slice(0, 10).map(log => ({
      id: log.id,
      title: formatActivityTitle(log),
      description: formatActivityDescription(log),
      time: formatRelativeTime(log.date_created),
      category: log.category,
      level: log.level,
      user: log.user,
      action: log.action,
      entity_type: log.entity_type
    }))
  })

  // Actions
           const fetchAuditlogs = async (params?: { query?: any }) => {
           loading.value = true
           error.value = null

           try {
             // Always filter by user's company
             const companyId = getUserCompanyId.value
             if (!companyId) {
               throw new Error('User company not found')
             }

             const queryParams = {
               ...params,
               query: {
                 ...params?.query,
                 company_id: companyId
               }
             }

             // Handle search parameter
             if (params?.query?.search) {
               queryParams.query.search = params.query.search
               delete queryParams.query.$or // Remove any existing $or query
             }

             const response = await auditlogsControllers.getAuditlogs(queryParams)
      
      if (response && response.data) {
        auditlogs.value = response.data
        pagination.value = {
          total: response.total || 0,
          limit: response.limit || 10,
          skip: response.skip || 0,
          currentPage: Math.floor((response.skip || 0) / (response.limit || 10)) + 1
        }
      } else if (Array.isArray(response)) {
        auditlogs.value = response
        pagination.value = {
          total: response.length,
          limit: response.length,
          skip: 0,
          currentPage: 1
        }
      } else {
        auditlogs.value = []
        pagination.value = {
          total: 0,
          limit: 10,
          skip: 0,
          currentPage: 1
        }
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch audit logs'
      handleAuthError(err)
    } finally {
      loading.value = false
    }
  }

           const fetchRecentActivity = async (limit: number = 10) => {
           loading.value = true
           error.value = null

           try {
             console.log('🔄 Fetching recent activity...')

             // Always filter by user's company
             const companyId = getUserCompanyId.value
             console.log('🏢 User company ID:', companyId)

             if (!companyId) {
               throw new Error('User company not found')
             }

             const queryParams = {
               query: {
                 company_id: companyId,
                 $limit: limit,
                 $sort: { date_created: -1 }, // Most recent first
                 $select: ['id', 'user_id', 'action', 'entity_type', 'entity_id', 'category', 'level', 'date_created', 'user', 'company']
               }
             }

             console.log('🔍 Query params:', queryParams)

             const response = await auditlogsControllers.getAuditlogs(queryParams)
             console.log('📡 API response:', response)

             if (response && response.data) {
               auditlogs.value = response.data
               console.log('✅ Audit logs loaded from response.data:', response.data.length)
             } else if (Array.isArray(response)) {
               auditlogs.value = response
               console.log('✅ Audit logs loaded from array response:', response.length)
             } else {
               auditlogs.value = []
               console.log('⚠️ No audit logs found, setting empty array')
             }

             console.log('📊 Final audit logs count:', auditlogs.value.length)

           } catch (err: any) {
             console.error('❌ Error fetching recent activity:', err)
             error.value = err.message || 'Failed to fetch recent activity'
             handleAuthError(err)
           } finally {
             loading.value = false
           }
         }

  const fetchAuditlog = async (id: number) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await auditlogsControllers.getAuditlog(id)
      
      // Verify the audit log belongs to user's company
      const companyId = getUserCompanyId.value
      if (response.company_id !== companyId) {
        throw new Error('Access denied: Audit log does not belong to your company')
      }
      
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch audit log'
      handleAuthError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const createAuditlog = async (data: any) => {
    loading.value = true
    error.value = null
    
    try {
      console.log('🔍 Creating audit log with data:', data)
      const response = await auditlogsControllers.createAuditlog(data)
      console.log('✅ Audit log created successfully:', response)
      
      // Refresh the audit logs list
      await fetchRecentActivity(10)
      
      return response
    } catch (err: any) {
      console.error('❌ Error creating audit log:', err)
      error.value = err.message || 'Failed to create audit log'
      handleAuthError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const setPage = (page: number) => {
    pagination.value.currentPage = page
    pagination.value.skip = (page - 1) * pagination.value.limit
  }

  const setLimit = (limit: number) => {
    pagination.value.limit = limit
    pagination.value.currentPage = 1
    pagination.value.skip = 0
  }

  const clearError = () => {
    error.value = null
  }

  const handleAuthError = (err: any) => {
    if (err.code === 401) {
      const authStore = useAuthStore()
      authStore.logout()
    }
  }

  // Helper functions for formatting activity data
  const formatActivityTitle = (log: Auditlogs): string => {
    const actionMap: Record<string, string> = {
      'CREATE': 'Created',
      'UPDATE': 'Updated',
      'DELETE': 'Deleted',
      'PATCH': 'Modified',
      'GET': 'Viewed'
    }

    const entityMap: Record<string, string> = {
      'users': 'User',
      'entities': 'Entity',
      'roles': 'Role',
      'user-roles': 'User Role',
      'company': 'Company',
      'company-branches': 'Company Branch',
      'company-departments': 'Department',
      'shipments': 'Shipment',
      'shipment-types': 'Shipment Type',
      'entity-groups': 'Entity Group'
    }

    const action = actionMap[log.action] || log.action
    const entity = entityMap[log.entity_type] || log.entity_type

    return `${action} ${entity}`
  }

  const formatActivityDescription = (log: Auditlogs): string => {
    const user = log.user
    const userName = user ? `${user.first_name} ${user.last_name}` : 'System'
    
    if (log.action === 'CREATE') {
      return `${userName} created a new ${log.entity_type}`
    } else if (log.action === 'UPDATE' || log.action === 'PATCH') {
      return `${userName} updated ${log.entity_type} details`
    } else if (log.action === 'DELETE') {
      return `${userName} deleted a ${log.entity_type}`
    } else {
      return `${userName} performed ${log.action.toLowerCase()} on ${log.entity_type}`
    }
  }

  const formatRelativeTime = (dateString: string): string => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60)
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600)
      return `${hours} hour${hours > 1 ? 's' : ''} ago`
    } else {
      const days = Math.floor(diffInSeconds / 86400)
      return `${days} day${days > 1 ? 's' : ''} ago`
    }
  }

           return {
           auditlogs,
           loading,
           error,
           pagination,
           getAuditlogs,
           getLoading,
           getError,
           getPagination,
           getTotalPages,
           getRecentActivity,
           fetchAuditlogs,
           fetchRecentActivity,
           fetchAuditlog,
           createAuditlog,
           setPage,
           setLimit,
           clearError
         }
}) 