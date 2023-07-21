import { Button, Container, Grid, LinearProgress, useMediaQuery, useTheme } from '@mui/material'

import CategoriesList from './components/categories/CategoriesList'
import Modal from 'components/modal/Modal'
import Navigation from './components/Navigation'
import OrderSummary from './components/orderSummary/OrderSummary'
import ProductSelection from './components/products/ProductsSelection'
import Title from './components/Title'

import useOrders from './hooks/useOrders'

interface Props {
  roomType: string
  tableId?: string
  orderId: string
  deliveryId?: string
}

const OrderManagement = ({ roomType, tableId, deliveryId, orderId }: Props) => {
  const {
    orders, totalOrder, showSummaryModal, currentOrder, categoriesList,
    currentCategory, loadingCategories, productsList, loadingProducts,
    tableData, loadingTable, mainOrderNote, loadingOrder, ordersCopy,
    setShowSummaryModal, setCurrentOrder,
    onAddOrder, onDeleteOrder, handleIncrement, handleDecrement,
    onAddNote, onSearchProduct, onSelectCategory, onCancelNewOrder,
    onSaveNewResturantOrder, onChangeMainOrderNote, onUpdateResturantOrder,
    onBackAction, onCancelResturantOrder
  } = useOrders({ tableId, orderId, roomType })

  const theme = useTheme()
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md'))

  /* Component's Props */
  const orderSummaryProps = {
    orderId,
    roomType,
    orders,
    ordersCopy,
    totalOrder,
    tableData,
    deliveryId,
    currentOrder,
    mainOrderNote,
    setCurrentOrder,
    onDeleteOrder,
    handleIncrement,
    handleDecrement,
    onAddNote,
    onCancelNewOrder,
    onSaveNewResturantOrder,
    onChangeMainOrderNote,
    onUpdateResturantOrder
  }

  const productSelectionProps = {
    productsList,
    loadingProducts,
    onAddOrder,
    onSearchProduct
  }

  const navigationProps = {
    orders,
    setShowSummaryModal
  }

  const categoriesListProps = {
    categories: categoriesList,
    currentCategory,
    loadingCategories,
    onSelectCategory
  }

  return (
    <Container maxWidth="xl" sx={{ height: '100%' }}>
      {loadingTable || (loadingOrder && orderId !== 'new')
        ? <LinearProgress />
        : <>
          {!isMobileOrTablet && (
            <Button variant="text" onClick={onBackAction}>
              {roomType === 'delivery' ? ' < Volver a los deliveries' : ' < Volver a las mesas'}
            </Button>
          )}
          <Title
            orderId={orderId}
            onCancelResturantOrder={onCancelResturantOrder}
          />
          <Grid container height="90%">
            {!isMobileOrTablet && (
              <Grid item xs={12} sm={12} md={6}>
                <OrderSummary {...orderSummaryProps} />
              </Grid>
            )}
            <Grid item xs={12} sm={12} md={6} pl={2} pt={2} pb={8} height="100%">
              <CategoriesList {...categoriesListProps} />
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
        </>
      }
    </Container>
  )
}

export default OrderManagement
