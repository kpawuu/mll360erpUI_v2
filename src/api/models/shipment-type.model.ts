export interface ShipmentType {
  id: number
  type: string
  short_code: string
}

export interface CreateShipmentType {
  type: string
  short_code: string
}

export interface UpdateShipmentType {
  type?: string
  short_code?: string
} 