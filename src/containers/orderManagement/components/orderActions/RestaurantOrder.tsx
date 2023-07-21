import { Grid } from '@mui/material'
import { isEqual } from 'lodash'

import ActionButton from '../orderSummary/styled/ActionButton'

import { type Order } from 'containers/orderManagement/interfaces/Order'

import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'

interface Props {
  mainOrderNote?: string
  orderId: string
  orders: Order[]
  ordersCopy: Order[]
  orderTitle?: string
  roomType: string
  onCancelNewOrder: (roomType: string, isNewOrder: boolean) => void
  onSaveNewResturantOrder: () => void
  onUpdateResturantOrder: (orderId: string) => void
}

const RestaurantOrder = ({
  orderId, orderTitle, mainOrderNote, roomType, orders, ordersCopy,
  onCancelNewOrder, onSaveNewResturantOrder, onUpdateResturantOrder
}: Props) => {
  const isNewOrder = orderId === 'new'

  const hasChanges = !isEqual(orders, ordersCopy)

  return (
    <>
      {isNewOrder
        ? (
          <Grid container marginTop={1} spacing={2}>
            <Grid item xs={6} sm={6} md={6}
              display="flex" alignItems="center" justifyContent="center"
            >
              <ActionButton
                variant="contained" color="inherit"
                onClick={() => { onCancelNewOrder(roomType, isNewOrder) }}
              >
                Volver a las mesas
              </ActionButton>
            </Grid>
            <Grid
              item xs={6} sm={6} md={6}
              display="flex" alignItems="center" justifyContent="center"
            >
              <ActionButton
                variant="contained"
                color="primary"
                onClick={() => { onSaveNewResturantOrder() }}
              >
                Guardar orden
              </ActionButton>
            </Grid>
          </Grid>
        )
        : (
          <Grid container marginTop={1} spacing={2}>
            <Grid item xs={6} sm={6} md={6}
              display="flex" alignItems="center" justifyContent="center"
            >
              <ActionButton
                variant="contained" color="inherit"
              >
                <LibraryBooksIcon sx={{ mr: 1 }}/>
                Pre - Cuenta
              </ActionButton>
            </Grid>
            <Grid
              item xs={6} sm={6} md={6}
              display="flex" alignItems="center" justifyContent="center"
            >
              <ActionButton
                variant="contained"
                color="primary"
                onClick={
                  hasChanges
                    ? () => {
                      onUpdateResturantOrder(orderId)
                    }
                    : () => {
                      console.log('Pagar orden')
                    }
                } >
                {hasChanges ? 'Actualizar Orden' : 'Pagar Orden'}
              </ActionButton>
            </Grid>
          </Grid>
        )
      }
    </>
  )
}

export default RestaurantOrder
