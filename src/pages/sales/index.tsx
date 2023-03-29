import { useState } from 'react'
import { Container, Grid, Typography } from '@mui/material'

import AddOrderCard from './components/addOrder'
import FiltersModal from './components/FiltersModal'
import Navigation from './components/Navigation'
import OrderCard from './components/orderCard'
import OrdersFilters from './components/OrdersFilters'

import useOrders from './hooks/useOrders'
import useResponsive from 'helpers/hooks/useResponsive'

const SalesPage = () => {
  const {
    orders, roomType, filters: orderFilters, appliedFilters: orderAppliedFilters,
    onDeleteOrder, onEditOrder, onAddOrder, onChangeRoomType,
    onBlockOrder, onUnlockOrder, onFilterByStatus, onFilterByAmbient, onDeleteStatusFilter,
    onDeleteAmbientFilter, onApplyModalFilters
  } = useOrders()

  const { isMobileOrTablet } = useResponsive()

  const [showFiltersModal, setShowFiltersModal] = useState(false)

  /* Component's Props */
  const navigationProps = {
    roomType,
    orderAppliedFilters,
    setShowFiltersModal,
    onChangeRoomType
  }

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

  const filterModalProps = {
    showFiltersModal,
    setShowFiltersModal,
    onApplyModalFilters
  }

  return (
    <Container maxWidth='xl'>
      <Navigation {...navigationProps}/>
      {roomType === 'restaurant' && (
        <>
          {!isMobileOrTablet && <OrdersFilters {...orderFiltersProps} />}
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
          <FiltersModal {...filterModalProps}/>
        </>
      )}
      {roomType === 'delivery' && (
        <Typography>Órdenes por delivery</Typography>
      )}
    </Container>
  )
}

export default SalesPage
