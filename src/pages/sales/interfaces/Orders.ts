export interface OrderType {
  id: string
  name: string
  start_order: string
  clients: number
  total_payment: number
  type: string
  status: string
}

export interface RoomType {
  type: 'restaurant' | 'delivery'
}
