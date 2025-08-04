export interface EntityContactPerson {
  id: number
  company_id: number
  entity_id: number
  name: string
  email_address: string
  phone_number: string
  job_title?: string
  is_primary?: boolean
  date_created: string
  date_updated?: string
  date_deleted?: string
  company?: any
  entity?: any
}

export interface CreateEntityContactPerson {
  company_id: number
  entity_id: number
  name: string
  email_address: string
  phone_number: string
  job_title?: string
  is_primary?: boolean
}

export interface UpdateEntityContactPerson {
  company_id?: number
  entity_id?: number
  name?: string
  email_address?: string
  phone_number?: string
  job_title?: string
  is_primary?: boolean
} 