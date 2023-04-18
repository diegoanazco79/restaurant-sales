export interface ProductType {
  id: string
  name: string
  price: number
}

export interface Product {
  id: string
  name: string
  types: ProductType[]
  price?: number
}
