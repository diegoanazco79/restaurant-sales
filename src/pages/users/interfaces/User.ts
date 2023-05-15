export interface Filters {
  search: string
  page: number
  limit: number
}

export interface UserRole {
  _id: string
  name: string
}

export interface User {
  id: string
  username: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
}
