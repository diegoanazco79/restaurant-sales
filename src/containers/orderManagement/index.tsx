import { Button, Container, Grid } from '@mui/material'

import Navigation from './components/Navigation'
import OrderSummary from './components/orderSummary'
import TitlePage from 'components/titlePage'

import useResponsive from 'helpers/hooks/useResponsive'

import { type TableType } from 'pages/restaurant/interfaces/Tables'

interface Props {
  roomType: string
  tableOrder?: TableType
  onBackAction: () => void
}

const OrderManagement = ({ roomType, tableOrder, onBackAction }: Props) => {
  const orderName = tableOrder?.name ?? ''

  const { isMobileOrTablet } = useResponsive()

  return (
    <Container maxWidth='xl' sx={{ height: '100%' }}>
      {!isMobileOrTablet && (
        <Button variant='text' onClick={onBackAction} >
          {' < Volver a las mesas'}
        </Button>
      )}
      <TitlePage title={`Orden - ${orderName}`} />
      <Grid container height='90%'>
        <Grid item xs={12} sm={12} md={6}>
          <OrderSummary />
        </Grid>
        {!isMobileOrTablet && (
          <Grid item xs={12} sm={12} md={6}>
            Productos
          </Grid>
        )}
      </Grid>
      {isMobileOrTablet && (
        <Navigation onBackAction={onBackAction} />
      )}
    </Container>
  )
}

export default OrderManagement
