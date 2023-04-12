import { Box } from '@mui/material'

import EmptyOrders from './EmptyOrders'
import OrderItem from './OrderItem'
import OrdersActions from './OrdersActions'
import OrdersInfo from './OrdersInfo'
import SummaryLayout from './styled/SummaryLayout'
import Title from './Title'

import { type TableType } from 'pages/restaurant/interfaces/Tables'
import { type Order } from 'containers/orderManagement/interfaces/Order'

interface Props {
  tableOrder?: TableType
  isMobileOrTablet: boolean
  roomType: string
  orders: Order[]
  totalOrder: number
  onDeleteOrder: (id: string) => void
  handleIncrement: (id: string) => void
  handleDecrement: (id: string) => void
}

const OrderSummary = ({
  tableOrder, roomType, orders, totalOrder, isMobileOrTablet,
  onDeleteOrder, handleDecrement, handleIncrement
}: Props) => {
  const orderTitle = tableOrder?.name ?? ''

  /* Component's Props */
  const orderItemProps = {
    isMobileOrTablet,
    onDeleteOrder,
    handleIncrement,
    handleDecrement
  }

  const ordersInfoProps = {
    isMobileOrTablet, totalOrder
  }

  const ordersActionsProps = {
    isMobileOrTablet
  }

  return (
    <SummaryLayout maxWidth="xl" isMobileOrTablet={isMobileOrTablet}>
      {!isMobileOrTablet && <Title orderTitle={orderTitle} /> }
      {orders.length > 0
        ? (
          <>
            <Box
              height={isMobileOrTablet ? '50vh' : '60%'}
              overflow='auto'
              mt={isMobileOrTablet ? 0 : 1}
            >
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
            <OrdersInfo {...ordersInfoProps} />
            <OrdersActions {...ordersActionsProps}/>
          </>
        )
        : <EmptyOrders />
      }
    </SummaryLayout>
  )
}

export default OrderSummary
