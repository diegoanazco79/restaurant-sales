import { Box, Typography } from '@mui/material'

import Badge from 'components/badge'

import { BLOCKED, EMPTY, IN_PROGRESS } from 'pages/sales/helpers/constants'

interface Props {
  startOrder: string
  ambient: string
  status: string
  totalPayment: number
}

const OrderBody = ({ startOrder, ambient, status, totalPayment }: Props) => {
  return (
    <Box pt={2}>
      {status === EMPTY && (
        <Badge
          type='default'
          label='Vacía'
        />
      )}
      {status === IN_PROGRESS && (
        <>
          <Typography variant="body2" gutterBottom>
            <b>Inicio:</b> {startOrder}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <b>Ambiente:</b> {ambient}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <b>Total a pagar:</b> S/ {totalPayment}
          </Typography>

        </>
      )}
      {status === BLOCKED && (
        <Badge
          type='error'
          label='Bloqueado'
        />
      )}
    </Box>
  )
}

export default OrderBody
