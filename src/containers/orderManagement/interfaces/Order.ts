export interface OrderProductType {
  _id: string
  name: string
  price: number
}
export interface Order {
  id: string
  name: string
  price: number
  amount: number
  note?: string
  type?: OrderProductType
}
