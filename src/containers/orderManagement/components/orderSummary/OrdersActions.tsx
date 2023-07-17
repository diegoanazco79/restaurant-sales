import { Grid, useMediaQuery, useTheme } from '@mui/material'

import ActionButton from './styled/ActionButton'

import { type DeliveryOrder } from 'pages/delivery/interfaces/DeliveryOrder'
import Modal from 'components/modal/Modal'
import { useState } from 'react'
import DetailModal from '../detailModal/DetailModal'

interface Props {
  orderId: string
  deliveryOrder?: DeliveryOrder
  roomType: string
  onCancelNewOrder: (roomType: string, isNewOrder: boolean) => void
  onSaveNewResturantOrder: () => void
}

const OrdersActions = ({
  orderId, deliveryOrder, roomType,
  onCancelNewOrder, onSaveNewResturantOrder
}: Props) => {
  const theme = useTheme()
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md'))

  const [showDeliveryDetails, setShowDeliveryDetails] = useState(false)

  const isNewOrder = orderId === 'new'
  const isRestaurantOrder = roomType === 'restaurant'

  return (
    <>
      <Grid container marginTop={1} spacing={2}>
        {!isMobileOrTablet && (
          <Grid item xs={6} sm={6} md={6}
            display="flex" alignItems="center" justifyContent="center"
          >
            <ActionButton
              variant="contained" color="inherit"
              onClick={() => { onCancelNewOrder(roomType, isNewOrder) }}
            >
              {isNewOrder
                ? isRestaurantOrder
                  ? 'Volver a las mesas'
                  : 'Volver a los pedidos'
                : 'Cancelar orden'
              }
            </ActionButton>
          </Grid>
        )}
        <Grid
          item xs={isMobileOrTablet ? 12 : 6} sm={isMobileOrTablet ? 12 : 6} md={6}
          display="flex" alignItems="center" justifyContent="center"
        >
          <ActionButton
            variant="contained"
            color="primary"
            onClick={() => {
              roomType === 'delivery'
                ? setShowDeliveryDetails(true)
                : onSaveNewResturantOrder()
            }}
          >
            Guardar orden
          </ActionButton>
        </Grid>
      </Grid>
      <Modal
        title='Detalles de entrega'
        open={showDeliveryDetails}
        setOpen={setShowDeliveryDetails}
      >
        <DetailModal
          setShowDeliveryDetails={setShowDeliveryDetails}
        />
      </Modal>
    </>
  )
}

export default OrdersActions
