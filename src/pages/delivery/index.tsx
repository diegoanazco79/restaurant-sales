import { Container, Grid } from '@mui/material'

import AddDelivery from './components/AddDelivery'
import DeliveryItem from './components/deliveryItem/DeliveryItem'
import OrderManagement from 'containers/orderManagement'
import TitlePage from 'components/titlePage'

import useDelivery from './hooks/useDelivery'

import { deliveryOrders } from './mock/deliveryOrders'

const DeliveryPage = () => {
  const {
    deliveryOrder, showOrderManagement,
    onAddNewDelivery, onSelectDelivery, onBackToDeliveryList
  } = useDelivery()

  /* Component's Props */

  const orderManagementProps = {
    deliveryOrder,
    roomType: 'delivery',
    onBackAction: onBackToDeliveryList
  }

  return (
    <>
      {!showOrderManagement
        ? (
          <Container maxWidth='xl' sx={{ height: '100%' }}>
            <TitlePage title='Delivery'/>
            <Grid container spacing={3} pb={10}>
              <Grid item xs={12} sm={6} md={4}>
                <AddDelivery onAddNewDelivery={onAddNewDelivery} />
              </Grid>
              {deliveryOrders.map((deliveryOrder, idx) => (
                <Grid key={idx} item xs={12} sm={6} md={4}>
                  <DeliveryItem
                    id={deliveryOrder.id}
                    deliveryOrder={deliveryOrder}
                    client={deliveryOrder.client}
                    address={deliveryOrder.address}
                    cellPhone={deliveryOrder.cell_phone}
                    paymentType={deliveryOrder.payment_type}
                    provider={deliveryOrder.provider}
                    totalPayment={deliveryOrder.total_payment}
                    status={deliveryOrder.status}
                    onSelectDelivery={onSelectDelivery}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
        )
        : <OrderManagement {...orderManagementProps}/>
      }
    </>
  )
}

export default DeliveryPage
