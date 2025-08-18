export interface LogisticsContractRate {
  id: number
  opportunity_id: number
  company_id: number
  service_category: string
  rate_type: string
  rate_amount: number
  currency_id: number
  volume_tiers?: string
  effective_from?: string
  effective_to?: string
  warehouse_location?: string
  description?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CreateLogisticsContractRate {
  opportunity_id: number
  company_id?: number
  service_category: string
  rate_type: string
  rate_amount: number
  currency_id: number
  volume_tiers?: string
  effective_from?: string
  effective_to?: string
  warehouse_location?: string
  description?: string
  is_active?: boolean
}

export interface UpdateLogisticsContractRate {
  opportunity_id?: number
  company_id?: number
  service_category?: string
  rate_type?: string
  rate_amount?: number
  currency_id?: number
  volume_tiers?: string
  effective_from?: string
  effective_to?: string
  warehouse_location?: string
  description?: string
  is_active?: boolean
}
