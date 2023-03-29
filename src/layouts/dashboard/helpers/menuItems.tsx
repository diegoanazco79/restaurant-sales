import { adminRole } from 'helpers/constants'

import QueryStatsIcon from '@mui/icons-material/QueryStats'
import StorefrontIcon from '@mui/icons-material/Storefront'

export const menuItems = [
  {
    id: 'restaurant',
    main: true,
    name: 'Restaurante',
    to: '/restaurant',
    roles: [],
    icon: <StorefrontIcon />
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
