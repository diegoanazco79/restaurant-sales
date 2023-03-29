export interface TableType {
  id: string
  name: string
  start_order: string
  ambient: string
  total_payment: number
  status: string
}

export interface FiltersType {
  search: string
  status: string
  ambient: string
}

export interface AppliedFiltersType {
  status: boolean
  ambient: boolean
}
