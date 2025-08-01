export interface Company {
  id: number
  email: string
  name: string
  location?: string
  phone_number?: string
  user_id?: number
  country_id: number
  website?: string
  description?: string
  is_active_license?: boolean
  date_created: string
  date_updated?: string
  date_deleted?: string
  administrator_details?: {
    id: number
    first_name: string
    last_name: string
    phone_number: string
    email: string
  }
}

export interface CreateCompany {
  email: string
  name: string
  location?: string
  phone_number?: string
  user_id?: number
  country_id: number
  website?: string
  description?: string
  is_active_license?: boolean
}

export interface UpdateCompany {
  email?: string
  name?: string
  location?: string
  phone_number?: string
  user_id?: number
  country_id?: number
  website?: string
  description?: string
  is_active_license?: boolean
} 