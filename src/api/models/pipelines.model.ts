export interface Pipelines {
  id: number
  name: string
  description: string
  user_id: number
  company_id: number
  is_active: boolean
  date_created: string
  date_updated?: string
  date_deleted?: string
  user?: any
  company?: any
}

export interface CreatePipelines {
  name: string
  description: string
  user_id: number
  company_id: number
  is_active?: boolean
}

export interface UpdatePipelines {
  name?: string
  description?: string
  user_id?: number
  company_id?: number
  is_active?: boolean
} 