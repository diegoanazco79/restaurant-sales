import { useNavigate, useParams } from 'react-router-dom'

import OrderManagement from 'containers/orderManagement'

const OrderResturantPage = () => {
  const { tableId, orderId } = useParams()
  const navigate = useNavigate()

  const onBackToResturant = () => {
    navigate('/restaurant')
  }

  return (
    <>
      <OrderManagement
        roomType='restaurant'
        tableId={tableId}
        orderId={orderId}
        onBackAction={onBackToResturant}
      />
    </>
  )
}

export default OrderResturantPage
