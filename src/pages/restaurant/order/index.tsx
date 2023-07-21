import { useParams } from 'react-router-dom'

import OrderManagement from 'containers/orderManagement'

const OrderResturantPage = () => {
  const { tableId, orderId } = useParams()

  return (
    <>
      <OrderManagement
        roomType='restaurant'
        tableId={tableId}
        orderId={orderId ?? 'new'}
      />
    </>
  )
}

export default OrderResturantPage
