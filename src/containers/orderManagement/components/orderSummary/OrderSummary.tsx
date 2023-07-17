import { useState } from 'react'
import { Box, useMediaQuery, useTheme } from '@mui/material'

import EmptyOrders from './EmptyOrders'
import Modal from 'components/modal/Modal'
import NoteModal from './NoteModal'
import OrderItem from './OrderItem'
import OrdersActions from './OrdersActions'
import OrdersInfo from './OrdersInfo'
import SummaryLayout from './styled/SummaryLayout'
import Title from './Title'

import { type DeliveryOrder } from 'pages/delivery/interfaces/DeliveryOrder'
import { type Order } from 'containers/orderManagement/interfaces/Order'
import { type ProductType } from 'pages/products/interfaces/Products'
import { type TableType } from 'pages/restaurant/interfaces/Tables'

interface Props {
  orderId: string
  tableData?: TableType
  roomType: string
  orders: Order[]
  totalOrder: number
  deliveryOrder?: DeliveryOrder
  currentOrder?: Order
  mainOrderNote?: string
  setCurrentOrder: (order: Order) => void
  onDeleteOrder: (id: string, type: ProductType['_id']) => void
  handleIncrement: (id: string, type: ProductType['_id']) => void
  handleDecrement: (id: string, type: ProductType['_id']) => void
  onAddNote: (note: string, type: ProductType['_id']) => void
  onCancelNewOrder: (roomType: string, isNewOrder: boolean) => void
  onSaveNewResturantOrder: () => void
  onChangeMainOrderNote: (note: string) => void
}

const OrderSummary = ({
  orderId, tableData, roomType, orders, totalOrder,
  deliveryOrder, currentOrder, mainOrderNote,
  setCurrentOrder,
  onDeleteOrder, handleDecrement, handleIncrement, onAddNote,
  onCancelNewOrder, onSaveNewResturantOrder, onChangeMainOrderNote
}: Props) => {
  const [showNoteModal, setShowNoteModal] = useState(false)
  const orderTitle = tableData?.name ?? ''
  const currentOrderName = currentOrder?.name ?? ''

  const theme = useTheme()
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md'))

  /* Component's Props */
  const orderItemProps = {
    setCurrentOrder,
    setShowNoteModal,
    onDeleteOrder,
    handleIncrement,
    handleDecrement
  }

  const ordersInfoProps = { totalOrder, mainOrderNote, onChangeMainOrderNote }

  const ordersActionsProps = {
    orderId,
    deliveryOrder,
    roomType,
    onCancelNewOrder,
    onSaveNewResturantOrder
  }

  const noteModalProps = {
    currentOrder,
    setShowNoteModal,
    onAddNote
  }

  return (
    <SummaryLayout maxWidth="xl">
      {!isMobileOrTablet && <Title roomType={roomType} orderTitle={orderTitle} /> }
      {orders.length > 0
        ? (
          <>
            <Box height='50vh' overflow="auto" mt={isMobileOrTablet ? 0 : 1} >
              {orders.map((order, idx) => (
                <OrderItem
                  key={idx}
                  id={order?.id}
                  name={order?.name}
                  price={order?.price}
                  amount={order?.amount}
                  note={order?.note}
                  type={order?.type}
                  {...orderItemProps}
                />
              ))}
            </Box>
            <Modal
              open={showNoteModal}
              setOpen={setShowNoteModal}
              title={`Añadir nota a ${currentOrderName}`}
            >
              <NoteModal {...noteModalProps}/>
            </Modal>
            <OrdersInfo {...ordersInfoProps} />
            <OrdersActions {...ordersActionsProps} />
          </>
        )
        : (
          <EmptyOrders />
        )}
    </SummaryLayout>
  )
}

export default OrderSummary
