export const initialFilters = {
  searchType: '',
  search: '',
  typeSale: '',
  fromDate: '',
  toDate: ''
}

export const initialAppliedFilters = {
  typeSale: false,
  date: false
}

export const searchTypeOptions = [
  { id: 'user', label: 'Usuario' },
  { id: 'client', label: 'Cliente' }
]

export const typeSaleOptions = [
  { id: 'restaurant', label: 'Restaurante' },
  { id: 'delivery', label: 'Delivery' }
]
