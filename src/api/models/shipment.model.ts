export interface Shipment {
  id: number
  company_id: number
  client_id: number
  user_id: number
  shipment_type_id?: number
  package_type_id?: number
  package_unit_id?: number
  package_size_id?: number
  package_quantity?: number
  weight?: number
  supplier_id?: number
  delivery_location_id?: number
  delivery_date?: string
  shipment_mode: 'Air' | 'Sea' | 'Road' | 'Rail' | 'Other'
  category?: 'Onshore' | 'Offshore' | 'Other'
  country_of_origin?: number
  commodity_id?: number
  cargo_description?: string
  po_numbers?: string
  agent_invoice_number?: string
  vessel_flight_name?: string
  mbl?: string
  hbl?: string
  file_number?: string
  sequence?: string
  year?: string
  status_id?: number
  date_created: string
  date_updated?: string
  date_deleted?: string
  shipment_type?: {
    id: number
    type: string
    short_code: string
  }
  user?: {
    id: number
    first_name: string
    last_name: string
    email: string
  }
  company?: {
    id: number
    name: string
  }
  client?: {
    id: number
    name: string
  }
  country?: {
    id: number
    name: string
  }
  commodity?: {
    id: number
    name: string
    description?: string
  }
  package_type?: {
    id: number
    type: string
    description?: string
    mode: 'Air' | 'Sea' | 'Both'
  }
  package_unit?: {
    id: number
    type: string
    description?: string
  }
  package_size?: {
    id: number
    size: string
    description?: string
  }
  supplier?: {
    id: number
    name: string
  }
  delivery_location?: {
    id: number
    name: string
  }
  status?: {
    id: number
    status: string
    description?: string
    color?: string
  }
}

export interface CreateShipment {
  company_id: number
  client_id: number
  user_id: number
  shipment_type_id?: number
  package_type_id?: number
  package_unit_id?: number
  package_size_id?: number
  package_quantity?: number
  weight?: number
  supplier_id?: number
  delivery_location_id?: number
  delivery_date?: string
  shipment_mode: 'Air' | 'Sea' | 'Road' | 'Rail' | 'Other'
  category?: 'Onshore' | 'Offshore' | 'Other'
  country_of_origin?: number
  commodity_id?: number
  cargo_description?: string
  po_numbers?: string
  agent_invoice_number?: string
  vessel_flight_name?: string
  mbl?: string
  hbl?: string
  file_number?: string
  sequence?: string
  year?: string
  status_id?: number
}

export interface UpdateShipment {
  company_id?: number
  client_id?: number
  user_id?: number
  shipment_type_id?: number
  package_type_id?: number
  package_unit_id?: number
  package_size_id?: number
  package_quantity?: number
  weight?: number
  supplier_id?: number
  delivery_location_id?: number
  delivery_date?: string
  shipment_mode?: 'Air' | 'Sea' | 'Road' | 'Rail' | 'Other'
  category?: 'Onshore' | 'Offshore' | 'Other'
  country_of_origin?: number
  commodity_id?: number
  cargo_description?: string
  po_numbers?: string
  agent_invoice_number?: string
  vessel_flight_name?: string
  mbl?: string
  hbl?: string
  file_number?: string
  sequence?: string
  year?: string
  status_id?: number
} 