export const initialFilters = {
  search: '',
  page: 1,
  limit: 10
}

export const initialClient = {
  _id: '',
  name: '',
  typeDocument: '',
  document: '',
  phone: '',
  email: '',
  subsidiary: '',
  organization: ''
}

export const clientsRows = [
  { id: 'name', label: 'Nombre / Razon Social' },
  { id: 'document', label: 'Documento' },
  { id: 'phone', label: 'Teléfono' },
  { id: 'email', label: 'Correo Electrónico' },
  { id: 'actions', label: 'Acciones' }
]

export const typeDocumentOptions = [
  { value: 'dni', label: 'DNI' },
  { value: 'ruc', label: 'RUC' }
]
