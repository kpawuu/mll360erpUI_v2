export interface Commodity {
  id: number
  name: string
  company_id: number
  description?: string
  date_created: string
  date_updated?: string
  date_deleted?: string
  company?: {
    id: number
    name: string
  }
}

export interface CreateCommodity {
  name: string
  company_id: number
  description?: string
}

export interface UpdateCommodity {
  name?: string
  company_id?: number
  description?: string
} 