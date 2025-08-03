export interface Locations {
  id: number
  company_id: number
  name: string
  category: 'warehouse_locations' | 'vehicle_locations' | 'client_locations' | 'fuel_station_locations' | 'others'
  longitude?: string
  latitude?: string
  date_created: string
  date_updated?: string
  date_deleted?: string
  company?: {
    id: number
    name: string
  }
}

export interface CreateLocationsData {
  company_id: number
  name: string
  category: 'warehouse_locations' | 'vehicle_locations' | 'client_locations' | 'fuel_station_locations' | 'others'
  longitude?: string
  latitude?: string
}

export interface UpdateLocationsData {
  name?: string
  category?: 'warehouse_locations' | 'vehicle_locations' | 'client_locations' | 'fuel_station_locations' | 'others'
  longitude?: string
  latitude?: string
} 