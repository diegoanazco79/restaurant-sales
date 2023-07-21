import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'

import NavigationBadge from '../styled/NavigationBadge'

import FirstPageIcon from '@mui/icons-material/FirstPage'
import ListAltIcon from '@mui/icons-material/ListAlt'
import { type Order } from '../interfaces/Order'

interface Props {
  orders: Order[]
  setShowSummaryModal: React.Dispatch<React.SetStateAction<boolean>>
}

const Navigation = ({ orders, setShowSummaryModal }: Props) => {
  const ordersLength = orders.length

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
      >
        <BottomNavigationAction
          label="Volver a Mesas"
          icon={<FirstPageIcon />}
        />
        <BottomNavigationAction
          label="Ordenes"
          icon={
            <NavigationBadge
              color="secondary"
              badgeContent={ordersLength}
            >
              <ListAltIcon />
            </NavigationBadge>
          }
          onClick={() => { setShowSummaryModal(true) }}
        />
      </BottomNavigation>
    </Paper>
  )
}

export default Navigation
