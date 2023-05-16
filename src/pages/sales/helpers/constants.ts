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

export const salesRows = [
  { id: 'saleId', label: 'Nro. Venta' },
  { id: 'client', label: 'Cliente' },
  { id: 'typeSale', label: 'Tipo de Venta' },
  { id: 'totalAmount', label: 'Total' },
  { id: 'date', label: 'Fecha' },
  { id: 'invoice', label: 'Factura' },
  { id: 'user', label: 'Usuario' },
  { id: 'actions', label: 'Acciones' }
]

export const initialSale = {
  id: '',
  client: {
    id: '',
    name: '',
    typeDocument: '',
    document: '',
    phone: ''
  },
  typeSale: '',
  totalAmount: 0,
  date: '',
  invoice: '',
  user: {
    _id: '',
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    status: '',
    role: {
      _id: '',
      name: ''

    }
  }
}
