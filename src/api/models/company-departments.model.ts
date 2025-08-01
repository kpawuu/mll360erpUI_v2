export interface CompanyDepartment {
  id: number
  name: string
  company_id: number
  manager_id?: number
  supervisor_id?: number
  date_created: string
  date_updated?: string
  date_deleted?: string
  manager_details?: {
    id: number
    first_name: string
    last_name: string
    phone_number: string
    email: string
  }
  supervisor_details?: {
    id: number
    first_name: string
    last_name: string
    phone_number: string
    email: string
  }
}

export interface CreateCompanyDepartment {
  name: string
  company_id: number
  manager_id?: number
  supervisor_id?: number
}

export interface UpdateCompanyDepartment {
  name?: string
  company_id?: number
  manager_id?: number
  supervisor_id?: number
} 