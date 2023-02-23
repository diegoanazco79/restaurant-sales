import { adminRole } from 'helpers/constants'

import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore'
import QueryStatsIcon from '@mui/icons-material/QueryStats'

export const menuItems = [
  {
    id: 'sales',
    main: true,
    name: 'Ventas',
    to: '/sales',
    roles: [],
    icon: <LocalGroceryStoreIcon />
  },
  {
    id: 'analytics-reports',
    main: true,
    name: 'Analíticas & Reportes',
    to: '/reports',
    roles: [adminRole],
    icon: <QueryStatsIcon />
  }
]
