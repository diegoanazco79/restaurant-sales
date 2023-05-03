import { type Client } from 'pages/clients/interfaces/Clients'
import { type User } from 'pages/users/interfaces/User'

export interface Filters {
  searchType: string
  search: string
  invoiceType: string
  fromDate: any
  toDate: any
}

export interface AppliedFilters {
  invoiceType: boolean
  date: boolean
}

export interface Invoice {
  id: string
  invoiceType: string
  date: string
  client: Client
  totalAmount: number
  user: User
}
