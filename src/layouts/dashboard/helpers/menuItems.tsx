import { adminRole } from 'helpers/constants'

import BentoIcon from '@mui/icons-material/Bento'
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining'
import QueryStatsIcon from '@mui/icons-material/QueryStats'
import StorefrontIcon from '@mui/icons-material/Storefront'
import TapasIcon from '@mui/icons-material/Tapas'

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
    id: 'delivery',
    main: true,
    name: 'Delivery',
    to: '/delivery',
    roles: [],
    icon: <DeliveryDiningIcon />
  },
  {
    id: 'products',
    main: true,
    name: 'Productos',
    to: '/products',
    roles: [],
    icon: <TapasIcon />
  },
  {
    id: 'categories',
    main: true,
    name: 'Categorías',
    to: '/categories',
    roles: [],
    icon: <BentoIcon />
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
