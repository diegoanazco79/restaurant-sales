import { Box } from '@mui/material'

import EmptyOrders from './EmptyOrders'
import OrderItem from './OrderItem'
import OrdersActions from './OrdersActions'
import OrdersInfo from './OrdersInfo'
import SummaryLayout from './SummaryLayout'
import Title from './Title'

import { type TableType } from 'pages/restaurant/interfaces/Tables'
import { type Order } from 'containers/orderManagement/interfaces/Order'

interface Props {
  tableOrder?: TableType
  roomType: string
  orders: Order[]
  totalOrder: number
  onDeleteOrder: (id: string) => void
  handleIncrement: (id: string) => void
  handleDecrement: (id: string) => void
}

const OrderSummary = ({
  tableOrder, roomType, orders, totalOrder,
  onDeleteOrder, handleDecrement, handleIncrement
}: Props) => {
  const orderTitle = tableOrder?.name ?? ''

  /* Component's Props */
  const orderItemProps = {
    onDeleteOrder, handleIncrement, handleDecrement
  }

  return (
    <SummaryLayout maxWidth="xl">
      <Title orderTitle={orderTitle} />
      {orders.length > 0
        ? (
          <>
            <Box height='60%' overflow='auto' marginTop={1}>
              {orders.map((order, idx) => (
                <OrderItem
                  key={idx}
                  id={order?.id}
                  name={order?.name}
                  price={order?.price}
                  amount={order?.amount}
                  {...orderItemProps}
                />
              ))}
            </Box>
            <OrdersInfo totalOrder={totalOrder} />
            <OrdersActions />
          </>
        )
        : <EmptyOrders />
      }
    </SummaryLayout>
  )
}

export default OrderSummary
