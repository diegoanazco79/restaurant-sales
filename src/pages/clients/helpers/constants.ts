export const initialFilters = {
  search: ''
}

export const initialClient = {
  id: '',
  name: '',
  typeDocument: '',
  document: '',
  phone: ''
}

export const clientsRows = [
  { id: 'name', label: 'Nombre / Razon Social' },
  { id: 'document', label: 'Documento' },
  { id: 'phone', label: 'Teléfono' },
  { id: 'actions', label: 'Acciones' }
]

export const typeDocumentOptions = [
  { value: 'dni', label: 'DNI' },
  { value: 'ruc', label: 'RUC' }
]
