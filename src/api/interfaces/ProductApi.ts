export interface ProductType {
  name: string
  price: number
  isInfinite?: boolean
  stockQuantity?: number
}

export interface CreateProduct {
  _id?: string
  name: string
  types: ProductType[] | []
  price?: number
  category?: string
  isInfinite?: boolean
  stockQuantity?: number
  updatedAt: string
  createdAt: string
}
