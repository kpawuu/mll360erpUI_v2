export interface Roles {
  id: number
  name: string
  description?: string
  access_level: number
  date_created: string
  date_updated?: string
  date_deleted?: string
}

export interface CreateRolesData {
  name: string
  description?: string
  access_level: number
}

export interface UpdateRolesData {
  name?: string
  description?: string
  access_level?: number
} 