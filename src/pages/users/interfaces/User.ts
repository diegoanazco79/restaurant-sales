export interface Filters {
  search: string
}

export interface UserRole {
  id: string
  name: string
}

export interface User {
  id: string
  username: string
  email: string
  firstName: string
  lastName: string
  status: string
  role: UserRole
}
