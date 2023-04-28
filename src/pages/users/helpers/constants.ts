export const initialFilters = {
  search: ''
}

export const usersRows = [
  { id: 'username', label: 'Usuario' },
  { id: 'email', label: 'Correo' },
  { id: 'firstName', label: 'Nombres' },
  { id: 'lastName', label: 'Apellidos' },
  { id: 'role', label: 'Rol' },
  { id: 'status', label: 'Estado' },
  { id: 'actions', label: 'Acciones' }
]

export const initialUser = {
  id: '',
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  status: '',
  role: { id: '', name: '' }
}

export const roleOptions = [
  { value: 'id_admin', label: 'Admin' },
  { value: 'id_sales', label: 'Ventas' }
]
