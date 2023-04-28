import BentoIcon from '@mui/icons-material/Bento'
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining'
import StorefrontIcon from '@mui/icons-material/Storefront'
import TapasIcon from '@mui/icons-material/Tapas'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import BadgeIcon from '@mui/icons-material/Badge'

export const menuItems = [
  {
    id: 'restaurant',
    main: true,
    name: 'Restaurante',
    to: '/restaurant',
    roles: [],
    section: 'sales',
    icon: <StorefrontIcon />
  },
  {
    id: 'delivery',
    main: true,
    name: 'Delivery',
    to: '/delivery',
    roles: [],
    section: 'sales',
    icon: <DeliveryDiningIcon />
  },
  {
    id: 'products',
    main: true,
    name: 'Productos',
    to: '/products',
    roles: [],
    section: 'productsManagement',
    icon: <TapasIcon />
  },
  {
    id: 'categories',
    main: true,
    name: 'Categorías',
    to: '/categories',
    roles: [],
    section: 'productsManagement',
    icon: <BentoIcon />
  },
  {
    id: 'users',
    main: true,
    name: 'Usuarios',
    to: '/users',
    roles: [],
    section: 'people',
    icon: <BadgeIcon />
  },
  {
    id: 'clients',
    main: true,
    name: 'Clientes',
    to: '/clients',
    roles: [],
    section: 'people',
    icon: <AssignmentIndIcon />
  }
]
