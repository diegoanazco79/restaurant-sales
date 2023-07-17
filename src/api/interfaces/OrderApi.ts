export interface ProductType {
  id: string
  name: string
}

export interface Product {
  id: string
  name: string
  type?: ProductType
  amount: number
  price: number
  note?: string
}

export interface Order {
  id?: string
  products: any
  client?: string
  // delivery?:
  restaurant?: string
  start_time: string
  end_time?: string
  total_price: number
  // invoice
  user: string
  note?: string
  status: string
}
