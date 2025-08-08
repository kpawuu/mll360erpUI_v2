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
  currency_id: number
  amount: number
  probability: number
  type: 'one-time' | 'contract'
  service_type: 'Freight' | 'Warehouse' | 'Transport'
  origin: string
  destination: string
  cargo_description: string
  expected_service_date: string
  expected_close_date: string
  lead_id?: number
  description: string
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
  currency_id: number
  amount: number
  probability: number
  type: 'one-time' | 'contract'
  service_type: 'Freight' | 'Warehouse' | 'Transport'
  origin: string
  destination: string
  cargo_description: string
  expected_service_date: string
  expected_close_date: string
  lead_id?: number
  description: string
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
  currency_id?: number
  amount?: number
  probability?: number
  type?: 'one-time' | 'contract'
  service_type?: 'Freight' | 'Warehouse' | 'Transport'
  origin?: string
  destination?: string
  cargo_description?: string
  expected_service_date?: string
  expected_close_date?: string
  lead_id?: number
  description?: string
  is_active?: boolean
} 