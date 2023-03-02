import { Box, Typography } from '@mui/material'

import Badge from 'components/badge'

import { EMPTY } from 'pages/sales/helpers/constants'

interface Props {
  startOrder: string
  clients: number
  status: string
  totalPayment: number
}

const OrderBody = ({ startOrder, clients, status, totalPayment }: Props) => {
  return (
    <Box pt={2}>
      <Typography variant="body2" gutterBottom>
        <b>Inicio:</b> {startOrder}
      </Typography>
      <Typography variant="body2" gutterBottom>
        <b>N° personas:</b> {clients}
      </Typography>
      {
        status === EMPTY
          ? <Badge
            type='default'
            label='Vacío'
          />
          : <Typography variant="body2" gutterBottom>
            <b>Total a pagar:</b> S/ {totalPayment}
          </Typography>
      }
    </Box>
  )
}

export default OrderBody
