export const initialFilters = {
  search: '',
  page: 1,
  limit: 10
}

export const usersRows = [
  { id: 'username', label: 'Usuario' },
  { id: 'email', label: 'Correo' },
  { id: 'name', label: 'Nombres y Apellidos' },
  { id: 'role', label: 'Rol' },
  { id: 'status', label: 'Estado' }
]

export const initialUser = {
  _id: '',
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  status: '',
  role: { _id: '', name: '' }
}

export const roleOptions = [
  { _id: '645e9e77a6b1142ac6403154', value: '645e9e77a6b1142ac6403154', label: 'Admin' },
  { _id: '645e9e0da6b1142ac6403148', value: '645e9e0da6b1142ac6403148', label: 'Ventas' }
]
