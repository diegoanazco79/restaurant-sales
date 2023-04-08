import { Box, Grid, TextField, Typography } from '@mui/material'

import OrderItem from './Item'
import { SummaryLayout } from '../styled/SummaryLayout'

import ListAltIcon from '@mui/icons-material/ListAlt'
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

  return (
    <SummaryLayout maxWidth="xl">
      <Box display="flex" alignItems="center" justifyContent="center">
        <ListAltIcon />
        <Typography variant="body1" marginLeft={1} fontWeight={600}>
          {`Platos de la ${orderTitle}`}
        </Typography>
      </Box>
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
                  onDeleteOrder={onDeleteOrder}
                  handleIncrement={handleIncrement}
                  handleDecrement={handleDecrement}
                />
              ))}
            </Box>
            <Grid container marginTop={3} marginBottom={1}>
              <Grid item md={6}>
                <Typography variant="body2" fontWeight={600}>
                  Observaciones
                </Typography>
              </Grid>
              <Grid item md={6} paddingRight={4}>
                <Typography variant="body1" fontWeight={600} textAlign='right'>
                  Total S/   {totalOrder}
                </Typography>
              </Grid>
            </Grid>
            <TextField
              name='observations'
              variant='outlined'
              fullWidth
              placeholder='Escribe aquí tus observaciones sobre el pedido'
            />
          </>
        )
        : (
          <Typography variant="body1" fontWeight={600}>
          No hay platos
          </Typography>
        )}

    </SummaryLayout>
  )
}

export default OrderSummary
