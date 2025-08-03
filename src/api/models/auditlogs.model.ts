// Audit logs model types based on the backend schema
export interface Auditlogs {
  id: number
  user_id?: number
  company_id?: number
  action: string
  entity_type: string
  entity_id: number
  old_data?: Record<string, any>
  new_data?: Record<string, any>
  changes?: Record<string, any>
  
  // Request information
  ip_address?: string
  user_agent?: string
  session_id?: string
  request_id?: string
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'WEBSOCKET'
  endpoint?: string
  status_code?: number
  error_message?: string
  duration?: number

  // Categorization
  level: 'info' | 'warn' | 'error' | 'debug'
  category: 'authentication' | 'authorization' | 'user_management' | 'company_management' | 'branch_management' | 'department_management' | 'inventory_management' | 'warehouse_operations' | 'onshore' | 'offshore' | 'transportation' | 'fleet_management' | 'order_processing' | 'delivery_management' | 'customer_management' | 'supplier_management' | 'document_management' | 'system' | 'finance_management' | 'approvals' | 'cashier' | 'report_and_downloads' | 'security'

  // Additional metadata
  metadata?: Record<string, any>

  // Timestamps
  date_created: string
  date_updated?: string
  date_deleted?: string

  // Virtual fields for relationships
  company?: Company
  user?: User
}

// Types for creating and updating audit logs
export type CreateAuditlogs = Omit<Auditlogs, 'id' | 'date_created' | 'date_updated' | 'date_deleted' | 'company' | 'user'>
export type UpdateAuditlogs = Partial<Omit<Auditlogs, 'id' | 'date_created' | 'date_updated' | 'date_deleted' | 'company' | 'user'>>

// Simplified types for the frontend
export interface Company {
  id: number
  name: string
  email?: string
  phone?: string
}

export interface User {
  id: number
  first_name: string
  last_name: string
  email: string
  staffid?: string
  job_title?: string
}

// Activity item type for the dashboard
export interface ActivityItem {
  id: number
  title: string
  description: string
  time: string
  category: string
  level: string
  user?: User
  action: string
  entity_type: string
} 