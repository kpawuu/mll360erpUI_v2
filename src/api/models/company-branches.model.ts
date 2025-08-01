export interface CompanyBranch {
  id: number
  name: string
  location: string
  location_type?: 'headquarter' | 'branch' | 'warehouse' | 'agent'
  is_active?: boolean
  company_id: number
  date_created: string
  date_updated?: string
  date_deleted?: string
}

export interface CreateCompanyBranch {
  name: string
  location: string
  location_type?: 'headquarter' | 'branch' | 'warehouse' | 'agent'
  is_active?: boolean
  company_id: number
}

export interface UpdateCompanyBranch {
  name?: string
  location?: string
  location_type?: 'headquarter' | 'branch' | 'warehouse' | 'agent'
  is_active?: boolean
  company_id?: number
} 