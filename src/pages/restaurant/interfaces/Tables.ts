export interface Room {
  _id: string
  name: string
}
export interface TableType {
  _id?: string
  name: string
  room: Room
  status: string
  order?: string
  subsidiary?: string
  organization?: string
}

export interface FiltersType {
  search: string
  status: string
  room: string
  page: number
  limit: number
}

export interface AppliedFiltersType {
  status: boolean
  room: boolean
}
