export interface DeliveryOrder {
  id: string
  client: string
  address: string
  cell_phone: string
  payment_type: string
  provider: string
  total_payment: number | null
  status: string
}
