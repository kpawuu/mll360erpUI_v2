export interface Currencies {
  id: number
  currency_name: string
  symbol: string
  toGHS_buying: number
  toGHS_selling: number
  toGHS_midrate: number
  is_default: boolean
  date_created: string
  date_updated?: string
  date_deleted?: string
}

export interface CreateCurrencies {
  currency_name: string
  symbol: string
  toGHS_buying: number
  toGHS_selling: number
  toGHS_midrate: number
  is_default: boolean
}

export interface UpdateCurrencies {
  currency_name?: string
  symbol?: string
  toGHS_buying?: number
  toGHS_selling?: number
  toGHS_midrate?: number
  is_default?: boolean
} 