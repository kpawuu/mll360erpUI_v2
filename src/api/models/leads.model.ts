export interface Leads {
  id: number
  title: string
  contact_id?: number | null
  contact_name: string
  contact_email?: string | null
  contact_phone?: string | null
  contact_position?: string | null
  entity_id?: number | null
  company_name: string
  company_website?: string | null
  company_address?: string | null
  service_type: 'Freight' | 'Warehouse' | 'Transport'
  origin: string
  destination: string
  cargo_description: string
  estimated_value: number
  pipeline_id: number
  stage_id: number
  expected_service_date: string
  converted_to_deal_id?: number | null
  converted_at?: string | null
  converted_by?: number | null
  is_active: boolean
  date_created: string
  date_updated?: string | null
  date_deleted?: string | null
  // Virtual fields
  contact?: any
  entity?: any
  pipeline?: any
  stage?: any
  converted_by_user?: any
}

export interface CreateLeads {
  title: string
  contact_id?: number | null
  contact_name: string
  contact_email?: string | null
  contact_phone?: string | null
  contact_position?: string | null
  entity_id?: number | null
  company_name: string
  company_website?: string | null
  company_address?: string | null
  service_type: 'Freight' | 'Warehouse' | 'Transport'
  origin: string
  destination: string
  cargo_description: string
  estimated_value: number
  pipeline_id: number
  stage_id: number
  expected_service_date: string
  is_active?: boolean
}

export interface UpdateLeads {
  title?: string
  contact_id?: number | null
  contact_name?: string
  contact_email?: string | null
  contact_phone?: string | null
  contact_position?: string | null
  entity_id?: number | null
  company_name?: string
  company_website?: string | null
  company_address?: string | null
  service_type?: 'Freight' | 'Warehouse' | 'Transport'
  origin?: string
  destination?: string
  cargo_description?: string
  estimated_value?: number
  pipeline_id?: number
  stage_id?: number
  expected_service_date?: string
  converted_to_deal_id?: number | null
  converted_at?: string | null
  converted_by?: number | null
  is_active?: boolean
} 