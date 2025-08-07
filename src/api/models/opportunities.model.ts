export interface Opportunities {
  id: number
  title: string
  pipeline_id: number
  stage_id: number
  company_id: number
  owner_id: number
  contact_id?: number
  contact_name: string
  contact_email?: string
  contact_phone?: string
  contact_position?: string
  entity_id?: number
  company_name: string
  company_website?: string
  company_address?: string
  origin: string
  destination: string
  cargo_description: string
  amount: number
  probability: number
  expected_close_date: string
  lead_id?: number
  date_created: string
  date_updated?: string
  date_deleted?: string
  converted_at?: string
  converted_by?: number
  converted_by_user?: any
  is_active: boolean
}

export interface CreateOpportunities {
  title: string
  pipeline_id: number
  stage_id: number
  company_id: number
  owner_id: number
  contact_id?: number
  contact_name: string
  contact_email?: string
  contact_phone?: string
  contact_position?: string
  entity_id?: number
  company_name: string
  company_website?: string
  company_address?: string
  origin: string
  destination: string
  cargo_description: string
  amount: number
  probability: number
  expected_close_date: string
  lead_id?: number
  is_active?: boolean
}

export interface UpdateOpportunities {
  title?: string
  pipeline_id?: number
  stage_id?: number
  company_id?: number
  owner_id?: number
  contact_id?: number
  contact_name?: string
  contact_email?: string
  contact_phone?: string
  contact_position?: string
  entity_id?: number
  company_name?: string
  company_website?: string
  company_address?: string
  origin?: string
  destination?: string
  cargo_description?: string
  amount?: number
  probability?: number
  expected_close_date?: string
  lead_id?: number
  is_active?: boolean
} 