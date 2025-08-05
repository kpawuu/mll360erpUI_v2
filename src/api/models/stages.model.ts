export interface Stages {
  id: number
  name: string
  description: string
  type: string
  position: number
  is_default: boolean
  user_id: number
  company_id: number
  date_created: string
  date_updated?: string
  date_deleted?: string
  user?: any
  company?: any
}

export interface CreateStages {
  name: string
  description: string
  type: string
  position: number
  is_default: boolean
  user_id: number
  company_id: number
}

export interface UpdateStages {
  name?: string
  description?: string
  type?: string
  position?: number
  is_default?: boolean
  user_id?: number
  company_id?: number
} 