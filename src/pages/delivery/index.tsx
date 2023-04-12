import { Container, Grid } from '@mui/material'

import AddDelivery from './components/AddDelivery'
import DeliveryItem from './components/deliveryItem/DeliveryItem'
import TitlePage from 'components/titlePage'

import { deliveryOrders } from './mock/deliveryOrders'

const DeliveryPage = () => {
  return (
    <Container maxWidth='xl' sx={{ height: '100%' }}>
      <TitlePage title='Delivery'/>
      <Grid container spacing={3} pb={10}>
        <Grid item xs={12} sm={6} md={4}>
          <AddDelivery />
        </Grid>
        {deliveryOrders.map((deliveryOrder, idx) => (
          <Grid key={idx} item xs={12} sm={6} md={4}>
            <DeliveryItem
              id={deliveryOrder.id}
              client={deliveryOrder.client}
              address={deliveryOrder.address}
              cellPhone={deliveryOrder.cell_phone}
              paymentType={deliveryOrder.payment_type}
              provider={deliveryOrder.provider}
              totalPayment={deliveryOrder.total_payment}
              status={deliveryOrder.status}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default DeliveryPage
