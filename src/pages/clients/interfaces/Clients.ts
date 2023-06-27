export interface Filters {
  search: string
  page: number
  limit: number
}

export interface Client {
  _id: string
  name: string
  typeDocument: string
  document: string
  phone?: string
  email?: string
  subsidiary: string
  organization: string
}
