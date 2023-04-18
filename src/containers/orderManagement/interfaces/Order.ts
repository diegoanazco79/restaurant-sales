import { type ProductType } from './Products'

export interface Order {
  id: string
  name: string
  price: number
  amount: number
  note?: string
  type?: ProductType
}
