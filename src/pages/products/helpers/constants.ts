/* Initial product state */
export const initialProduct = {
  _id: '',
  name: '',
  types: [],
  isInfinite: true,
  updatedAt: '',
  createdAt: '',
  subsidiary: '',
  organization: ''
}
/* Initial product type state */
export const initialProductType = {
  _id: '',
  name: '',
  price: 0,
  isInfinite: true
}

/* Products table rows */
export const producTableRows = [
  { id: 'name', label: 'Nombre' },
  { id: 'price', label: 'Precio' },
  { id: 'types', label: 'Tipos' },
  { id: 'category', label: 'Categoría' },
  { id: 'stockQuantity', label: 'Stock' },
  { id: 'actions', label: 'Acciones' }
]

export const initialFilters = {
  search: '',
  category: '',
  page: 1,
  limit: 10
}

export const initialAppliedFilters = {
  category: false
}
