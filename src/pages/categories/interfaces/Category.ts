export interface Category {
  _id: string
  name: string
  subsidiary: string
  organization: string
  createdAt: string
  updatedAt: string
}

export interface Filters {
  search: string
}
