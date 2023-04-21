export interface ProductType {
  id: string
  name: string
  price: number
  isInfinite?: boolean
  stockQuantity?: number
}

export interface CategoryProductType {
  id: string
  name: string
}

export interface Product {
  id: string
  name: string
  types: ProductType[] | []
  price?: number
  category?: CategoryProductType
  isInfinite?: boolean
  stockQuantity?: number
}
