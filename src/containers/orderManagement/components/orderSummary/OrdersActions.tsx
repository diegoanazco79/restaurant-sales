import RestaurantOrder from '../orderActions/RestaurantOrder'

import { type DeliveryOrder } from 'pages/delivery/interfaces/DeliveryOrder'
import { type Order } from 'containers/orderManagement/interfaces/Order'

interface Props {
  deliveryOrder?: DeliveryOrder
  mainOrderNote?: string
  orderId: string
  orders: Order[]
  ordersCopy: Order[]
  orderTitle?: string
  roomType: string
  onCancelNewOrder: (roomType: string, isNewOrder: boolean) => void
  onSaveNewResturantOrder: () => void
  onUpdateResturantOrder: (orderId: string) => void
}

const OrdersActions = ({
  orderId, deliveryOrder, roomType, orderTitle, orders,
  mainOrderNote, ordersCopy,
  onCancelNewOrder, onSaveNewResturantOrder, onUpdateResturantOrder
}: Props) => {
  const isRestaurantOrder = roomType === 'restaurant'

  const restaurantOrderProps = {
    orderId,
    orderTitle,
    orders,
    ordersCopy,
    roomType,
    mainOrderNote,
    onCancelNewOrder,
    onSaveNewResturantOrder,
    onUpdateResturantOrder
  }

  return (
    <>
      {isRestaurantOrder && <RestaurantOrder {...restaurantOrderProps}/> }
    </>

  )
}

export default OrdersActions
