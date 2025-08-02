export interface Status {
  id: number
  type: 'onshore' | 'offshore' | 'transport' | 'warehouse' | 'crm'
  status: string
  description?: string
  color?: string
  icon?: string
  date_created: string
  date_updated?: string
  date_deleted?: string
}

export interface CreateStatus {
  type: 'onshore' | 'offshore' | 'transport' | 'warehouse' | 'crm'
  status: string
  description?: string
  color?: string
  icon?: string
}

export interface UpdateStatus {
  type?: 'onshore' | 'offshore' | 'transport' | 'warehouse' | 'crm'
  status?: string
  description?: string
  color?: string
  icon?: string
} 