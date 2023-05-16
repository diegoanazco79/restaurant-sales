export const invoiceTypeOptions = [
  { id: 'boleta', label: 'Boleta' },
  { id: 'factura', label: 'Factura' }
]

export const initialFilters = {
  searchType: '',
  search: '',
  invoiceType: '',
  fromDate: '',
  toDate: ''
}

export const initialAppliedFilters = {
  invoiceType: false,
  date: false
}

export const invoceTableRows = [
  { id: 'invoiceId', label: 'Nro. Boleta / Factura' },
  { id: 'typeInvoice', label: 'Tipo de Boleta / Factura' },
  { id: 'date', label: 'Fecha' },
  { id: 'client', label: 'Cliente' },
  { id: 'totalAmount', label: 'Total' },
  { id: 'actions', label: 'Acciones' }
]

export const initialInvoice = {
  id: '',
  invoiceType: '',
  date: '',
  client: {
    id: '',
    name: '',
    typeDocument: '',
    document: '',
    phone: ''
  },
  totalAmount: 0,
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
