export interface PackageType {
  id: number
  type: string
  description?: string
  notes?: string
  mode: 'Air' | 'Sea' | 'Both'
  defined_quantity: 'Yes' | 'No'
  date_created: string
  date_updated?: string
  date_deleted?: string
  units?: Array<{
    id: number
    type: string
    description?: string
    notes?: string
    package_type_id: number
  }>
  sizes?: Array<{
    id: number
    size: string
    description?: string
    package_type_id: number
  }>
}

export interface CreatePackageType {
  type: string
  description?: string
  notes?: string
  mode: 'Air' | 'Sea' | 'Both'
  defined_quantity: 'Yes' | 'No'
}

export interface UpdatePackageType {
  type?: string
  description?: string
  notes?: string
  mode?: 'Air' | 'Sea' | 'Both'
  defined_quantity?: 'Yes' | 'No'
} 