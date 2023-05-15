export interface Profile {
  name: string
  email: string
  username: string
}

export interface Organization {
  id: string | undefined
  name: string | undefined
  logo?: string
  fullName: string
}

export interface Rol {
  id: string | undefined
  name: string | undefined
}

export interface Subsidiary {
  id: string
  name: string
}
