export interface ProductType {
  _id: string
  name: string
  price: number
  isInfinite?: boolean
  stockQuantity?: number
}

export interface CategoryProductType {
  _id: string
  name: string
  createdAt?: string
  updatedAt?: string
  organization?: string
  subsidiary?: string
}

export interface Product {
  _id?: string
  name: string
  types: ProductType[] | []
  price?: number
  category?: CategoryProductType | null
  isInfinite?: boolean
  stockQuantity?: number
  updatedAt: string
  createdAt: string
}

export interface FiltersType {
  search: string
  category: string
  page: number
  limit: number
}

export interface AppliedFiltersType {
  category: boolean
}
