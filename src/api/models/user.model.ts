export interface User {
  id: number
  first_name: string
  last_name: string
  phone_number: string
  job_title: string
  staffid: string
  gender: string
  email: string
  picture?: string
  current_ip_address?: string
  government_issued_id_number?: string
  usertype: number
  ss_no: string
  dob?: string
  issue_date?: string
  expiry_date?: string
  fcmtoken?: string
  privelege?: number
  company_id?: number
  department_id?: number
  branch_id?: number
  fcmToken?: string
  isVerified?: boolean
  verifyToken?: any
  verifyShortToken?: any
  verifyExpires?: any
  verifyChanges?: any
  resetToken?: any
  resetExpires?: any
  resetShortToken?: any
  resetAttempts?: any
  date_created: string
  date_updated?: string
  date_deleted?: string
  type?: {
    id: number
    type_name: string
    type_description?: string
  }
  company?: {
    id: number
    company_name: string
    company_description?: string
  }
  branch?: {
    id: number
    branch_name: string
    branch_description?: string
  }
  profile_pictures?: Array<{
    id: number
    entity_id: number
    entity_type: string
    file_name: string
    file_description: string
    file_type: string
    file_size?: number
    file_url: string
    file_hash: string
    file_extension: string
    date_created: string
  }>
  user_roles?: Array<{
    id: number
    role_id: number
    company_id: number
    department_id: number
    user_id: number
    date_created: string
    date_updated?: string
    date_deleted?: string
  }>
}

export interface CreateUser {
  first_name: string
  last_name: string
  phone_number: string
  job_title: string
  staffid: string
  gender: string
  email: string
  picture?: string
  current_ip_address?: string
  government_issued_id_number?: string
  issue_date?: string
  expiry_date?: string
  ss_no: string
  usertype: number
  fcmtoken?: string
  privelege?: number
  company_id?: number
  branch_id?: number
  dob?: string
}

export interface UpdateUser {
  first_name?: string
  last_name?: string
  phone_number?: string
  job_title?: string
  staffid?: string
  gender?: string
  email?: string
  picture?: string
  current_ip_address?: string
  government_issued_id_number?: string
  issue_date?: string
  expiry_date?: string
  ss_no?: string
  usertype?: number
  fcmtoken?: string
  privelege?: number
  company_id?: number
  branch_id?: number
  dob?: string
} 