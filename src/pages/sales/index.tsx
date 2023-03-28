import { Container, Grid, Typography } from '@mui/material'

import AddOrderCard from './components/addOrder'
import OrdersFilters from './components/OrdersFilters'
import OrderCard from './components/orderCard'
import Title from './components/Title'

import useOrders from './hooks/useOrders'

const SalesPage = () => {
  const {
    orders, roomType, filters: orderFilters, appliedFilters: orderAppliedFilters,
    onDeleteOrder, onEditOrder, onAddOrder, onChangeRoomType,
    onBlockOrder, onUnlockOrder, onFilterByStatus, onFilterByAmbient, onDeleteStatusFilter,
    onDeleteAmbientFilter
  } = useOrders()

  /* Component's Props */
  const titleProps = { roomType, onChangeRoomType }

  const orderCardProps = {
    onDeleteOrder, onEditOrder, onBlockOrder, onUnlockOrder
  }

  const orderFiltersProps = {
    orderFilters,
    orderAppliedFilters,
    onFilterByStatus,
    onFilterByAmbient,
    onDeleteStatusFilter,
    onDeleteAmbientFilter
  }

  return (
    <Container maxWidth='xl'>
      <Title {...titleProps}/>
      <OrdersFilters {...orderFiltersProps} />
      {roomType === 'restaurant' && (
        <Grid container spacing={3}>
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
      )}
      {roomType === 'delivery' && (
        <Typography>Órdenes por delivery</Typography>
      )}
    </Container>
  )
}

export default SalesPage
