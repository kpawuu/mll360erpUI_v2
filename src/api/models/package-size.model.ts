export interface PackageSize {
  id: number
  size: string
  description?: string
  package_type_id: number
  date_created: string
  date_updated?: string
  date_deleted?: string
  package_type?: {
    id: number
    type: string
    description?: string
  }
}

export interface CreatePackageSize {
  size: string
  description?: string
  package_type_id: number
}

export interface UpdatePackageSize {
  size?: string
  description?: string
  package_type_id?: number
} 