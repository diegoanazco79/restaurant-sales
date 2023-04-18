import { Button, Container, Grid } from '@mui/material'

import CategoriesList from './components/categories/CategoriesList'
import Modal from 'components/modal/Modal'
import Navigation from './components/Navigation'
import OrderSummary from './components/orderSummary/OrderSummary'
import ProductSelection from './components/products/ProductsSelection'
import TitlePage from 'components/titlePage'

import useResponsive from 'helpers/hooks/useResponsive'
import useOrders from './hooks/useOrders'

import { type TableType } from 'pages/restaurant/interfaces/Tables'
import { type DeliveryOrder } from 'pages/delivery/interfaces/DeliveryOrder'

interface Props {
  roomType: string
  tableOrder?: TableType
  deliveryOrder?: DeliveryOrder
  onBackAction: () => void
}

const OrderManagement = ({ roomType, deliveryOrder, tableOrder, onBackAction }: Props) => {
  const {
    orders, totalOrder, showSummaryModal,
    setShowSummaryModal,
    onAddOrder, onDeleteOrder, handleIncrement, handleDecrement
  } = useOrders()
  const { isMobileOrTablet } = useResponsive()

  /* Component's Props */
  const orderSummaryProps = {
    isMobileOrTablet,
    tableOrder,
    roomType,
    orders,
    totalOrder,
    deliveryOrder,
    onDeleteOrder,
    handleIncrement,
    handleDecrement
  }

  const productSelectionProps = {
    onAddOrder
  }

  const navigationProps = {
    orders,
    setShowSummaryModal,
    onBackAction
  }

  return (
    <Container maxWidth="xl" sx={{ height: '100%' }}>
      {!isMobileOrTablet && (
        <Button variant="text" onClick={onBackAction}>
          {roomType === 'delivery' ? ' < Volver a los deliveries' : ' < Volver a las mesas'}
        </Button>
      )}
      <TitlePage title="Administración del Pedido" />
      <Grid container height="90%">
        {!isMobileOrTablet && (
          <Grid item xs={12} sm={12} md={6}>
            <OrderSummary {...orderSummaryProps} />
          </Grid>
        )}
        <Grid item xs={12} sm={12} md={6} pl={2} pt={2} pb={8} height="100%">
          <CategoriesList />
          <ProductSelection {...productSelectionProps} />
        </Grid>
      </Grid>
      {isMobileOrTablet && <Navigation {...navigationProps} />}
      <Modal
        open={showSummaryModal}
        setOpen={setShowSummaryModal}
        title="Platos de la Mesa 1"
      >
        <OrderSummary {...orderSummaryProps} />
      </Modal>
    </Container>
  )
}

export default OrderManagement
