import { Container, Grid } from '@mui/material'

import OrderCard from './components/orderCard'

import useOrders from './hooks/useOrders'

const SalesPage = () => {
  const { orders, onDeleteOrder, onEditOrder } = useOrders()

  /* Component's Props */
  const orderCardProps = {
    onDeleteOrder, onEditOrder
  }

  return (
    <Container maxWidth='xl'>
      <Grid container spacing={3}>
        {orders?.map(order => (
          <Grid key={order.id} item xs={12} sm={6} md={3}>
            <OrderCard
              order={order}
              {...orderCardProps}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default SalesPage
