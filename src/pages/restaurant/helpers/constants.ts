export const IN_PROGRESS = 'in_progress'
export const EMPTY = 'empty'
export const BLOCKED = 'blocked'

export const initialOrdersFilters = {
  search: '',
  status: '',
  room: '',
  page: 1,
  limit: 100
}

export const initialOrdersAppliedFilters = {
  status: false,
  room: false
}

export const initialTable = {
  _id: '',
  name: '',
  room: {
    _id: '',
    name: ''
  },
  status: ''
}
