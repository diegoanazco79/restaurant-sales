import { type Client } from 'pages/clients/interfaces/Clients'
import { type User } from 'pages/users/interfaces/User'

export interface Filters {
  searchType: string
  search: string
  typeSale: string
  fromDate: any
  toDate: any
}

export interface AppliedFilters {
  typeSale: boolean
  date: boolean
}

export interface Sale {
  id: string
  client: Client
  typeSale: string
  totalAmount: number
  date: string
  invoice: string
  user: User
}
