export interface OrderType {
  id: string
  name: string
  start_order: string
  ambient: string
  total_payment: number
  status: string
}

export interface RoomType {
  type: 'restaurant' | 'delivery'
}

export interface OrdersAppliedFiltersType {
  status: boolean
  ambient: boolean
}

export interface OrdersFiltersType {
  search: string
  status: string
  ambient: string
}
