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
  category?: CategoryProductType | null
  isInfinite?: boolean
  stockQuantity?: number
}

export interface FiltersType {
  search: string
  category: string
}

export interface AppliedFiltersType {
  category: boolean
}
