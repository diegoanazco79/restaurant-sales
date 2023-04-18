import { useState } from 'react'
import { Box } from '@mui/material'

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
import { type ProductType } from 'containers/orderManagement/interfaces/Products'
import { type TableType } from 'pages/restaurant/interfaces/Tables'

interface Props {
  tableOrder?: TableType
  isMobileOrTablet: boolean
  roomType: string
  orders: Order[]
  totalOrder: number
  deliveryOrder?: DeliveryOrder
  currentOrder?: Order
  setCurrentOrder: (order: Order) => void
  onDeleteOrder: (id: string, type: ProductType['id']) => void
  handleIncrement: (id: string, type: ProductType['id']) => void
  handleDecrement: (id: string, type: ProductType['id']) => void
  onAddNote: (note: string, type: ProductType['id']) => void
}

const OrderSummary = ({
  tableOrder, roomType, orders, totalOrder, isMobileOrTablet,
  deliveryOrder, currentOrder,
  setCurrentOrder,
  onDeleteOrder, handleDecrement, handleIncrement, onAddNote
}: Props) => {
  const [showNoteModal, setShowNoteModal] = useState(false)
  const orderTitle = tableOrder?.name ?? ''
  const currentOrderName = currentOrder?.name ?? ''

  /* Component's Props */
  const orderItemProps = {
    isMobileOrTablet,
    setCurrentOrder,
    setShowNoteModal,
    onDeleteOrder,
    handleIncrement,
    handleDecrement
  }

  const ordersInfoProps = {
    isMobileOrTablet,
    totalOrder
  }

  const ordersActionsProps = {
    isMobileOrTablet, deliveryOrder, roomType
  }

  const noteModalProps = {
    currentOrder,
    setShowNoteModal,
    onAddNote
  }

  return (
    <SummaryLayout maxWidth="xl" isMobileOrTablet={isMobileOrTablet}>
      {!isMobileOrTablet && (
        <Title roomType={roomType} orderTitle={orderTitle} />
      )}
      {orders.length > 0
        ? (
          <>
            <Box
              height='50vh'
              overflow="auto"
              mt={isMobileOrTablet ? 0 : 1}
            >
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
