import { Container, Grid } from '@mui/material'
import AddOrderCard from './components/addOrder'

import OrderCard from './components/orderCard'
import Title from './components/Title'

import useOrders from './hooks/useOrders'

const SalesPage = () => {
  const {
    orders, roomType,
    onDeleteOrder, onEditOrder, onAddOrder, onChangeRoomType
  } = useOrders()

  /* Component's Props */
  const titleProps = { roomType, onChangeRoomType }

  const orderCardProps = {
    onDeleteOrder, onEditOrder
  }

  return (
    <Container maxWidth='xl'>
      <Title {...titleProps}/>
      <Grid container spacing={3} marginTop={1}>
        {orders?.map(order => (
          <Grid key={order.id} item xs={12} sm={6} md={3}>
            <OrderCard
              order={order}
              {...orderCardProps}
            />
          </Grid>
        ))}
        <Grid item xs={12} sm={6} md={3}>
          <AddOrderCard onAddOrder={onAddOrder}/>
        </Grid>
      </Grid>
    </Container>
  )
}

export default SalesPage
