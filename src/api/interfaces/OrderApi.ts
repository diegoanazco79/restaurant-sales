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

export interface CreateRestaurantOrder {
  id?: string
  products: any
  client?: string
  restaurant?: string
  start_time: string
  end_time?: string
  total_price: number
  user: string
  note?: string
  status: string
}

export interface UpdateRestaurantOrder {
  id: string
  products: any
  total_price: number
  note?: string
  status: string
}
