export interface Subsidiary {
  _id: string
  name: string
}

export interface Organization {
  id: string
  name: string
  fullName?: string
  logo?: string
  subsidiaries?: Subsidiary[]
}
