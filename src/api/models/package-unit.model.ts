export interface PackageUnit {
  id: number
  unit: string
  description?: string
  notes?: string
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

export interface CreatePackageUnit {
  unit: string
  description?: string
  notes?: string
  package_type_id: number
}

export interface UpdatePackageUnit {
  unit?: string
  description?: string
  notes?: string
  package_type_id?: number
} 