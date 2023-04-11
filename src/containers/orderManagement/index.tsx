import { Button, Container, Grid } from '@mui/material'

import CategoriesList from './components/categories/CategoriesList'
import Navigation from './components/Navigation'
import OrderSummary from './components/orderSummary/OrderSummary'
import ProductSelection from './components/products/ProductsSelection'
import TitlePage from 'components/titlePage'

import useResponsive from 'helpers/hooks/useResponsive'
import useOrders from './hooks/useOrders'

import { type TableType } from 'pages/restaurant/interfaces/Tables'

interface Props {
  roomType: string
  tableOrder?: TableType
  onBackAction: () => void
}

const OrderManagement = ({ roomType, tableOrder, onBackAction }: Props) => {
  const {
    orders, totalOrder,
    onAddOrder, onDeleteOrder, handleIncrement, handleDecrement
  } = useOrders()
  const { isMobileOrTablet } = useResponsive()

  /* Component's Props */
  const orderSummaryProps = {
    tableOrder,
    roomType,
    orders,
    totalOrder,
    onDeleteOrder,
    handleIncrement,
    handleDecrement
  }

  const productSelectionProps = {
    onAddOrder
  }

  return (
    <Container maxWidth="xl" sx={{ height: '100%' }}>
      {!isMobileOrTablet && (
        <Button variant="text" onClick={onBackAction}>
          {' < Volver a las mesas'}
        </Button>
      )}
      <TitlePage title="Administración del Pedido" />
      <Grid container height="90%">
        <Grid item xs={12} sm={12} md={6}>
          <OrderSummary {...orderSummaryProps} />
        </Grid>
        {!isMobileOrTablet && (
          <Grid item xs={12} sm={12} md={6} paddingLeft={2} paddingTop={2} height="100%" >
            <CategoriesList />
            <ProductSelection {...productSelectionProps} />
          </Grid>
        )}
      </Grid>
      {isMobileOrTablet && <Navigation onBackAction={onBackAction} />}
    </Container>
  )
}

export default OrderManagement
