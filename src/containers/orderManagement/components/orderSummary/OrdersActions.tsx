import { Grid, useMediaQuery, useTheme } from '@mui/material'

import ActionButton from './styled/ActionButton'

import { type DeliveryOrder } from 'pages/delivery/interfaces/DeliveryOrder'
import Modal from 'components/modal/Modal'
import { useState } from 'react'
import DetailModal from '../detailModal/DetailModal'

interface Props {
  deliveryOrder?: DeliveryOrder
  roomType: string
}

const OrdersActions = ({ deliveryOrder, roomType }: Props) => {
  const theme = useTheme()
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md'))

  const [showDeliveryDetails, setShowDeliveryDetails] = useState(false)

  return (
    <>
      <Grid container marginTop={1} spacing={2}>
        {!isMobileOrTablet && (
          <Grid
            item
            xs={6}
            sm={6}
            md={6}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ActionButton
              variant="contained"
              color="inherit"
            >
              Cancelar
            </ActionButton>
          </Grid>
        )}
        <Grid
          item
          xs={isMobileOrTablet ? 12 : 6}
          sm={isMobileOrTablet ? 12 : 6}
          md={6}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ActionButton
            variant="contained"
            color="primary"
            onClick={() => {
              roomType === 'delivery'
                ? setShowDeliveryDetails(true)
                : console.log('Holi')
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
