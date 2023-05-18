export interface UpdateUser {
  id: string
  firstName: string
  lastName: string
  email: string
  status: string
  role: string
}

export interface RegisterUser {
  token: string
  password: string
  status: string
}
