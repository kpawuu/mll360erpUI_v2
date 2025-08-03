export interface UserRoles {
  id: number
  user_id: number
  company_id: number
  role_id: number
  department_id: number
  date_created: string
  date_updated?: string
  date_deleted?: string
  company?: {
    id: number
    name: string
    email: string
    location: string
    phone_number: string
    website: string
    description: string
    country_id: number
    is_active_license: boolean
    user_id?: number
    date_created: string
    date_updated?: string
    date_deleted?: string
    country?: {
      id: number
      iso: string
      name: string
      nicename: string
      iso3: string
      numcode: number
      phonecode: number
    }
  }
  role?: {
    id: number
    name: string
    description?: string
    access_level: string
  }
  department?: {
    id: number
    name: string
    company_id: number
    manager_id?: number
    supervisor_id?: number
  }
  user?: {
    id: number
    first_name: string
    last_name: string
    email: string
    job_title: string
    staffid: string
    picture?: string
  }
}

export interface CreateUserRolesData {
  user_id: number
  company_id: number
  role_id: number
  department_id: number
}

export interface UpdateUserRolesData {
  role_id?: number
  department_id?: number
} 