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

export interface InvitationUser {
  username: string
  email: string
  firstName: string
  lastName: string
  role: string
  subsidiary: string
  organization: string
}
