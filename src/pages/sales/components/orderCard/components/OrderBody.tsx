import { CardContent, Typography } from '@mui/material'

import Badge from 'components/badge'

import { IN_PROGRESS } from 'pages/sales/helpers/constants'

interface Props {
  startOrder: string
  clients: number
  status: string
  totalPayment: number
}

const OrderBody = ({ startOrder, clients, status, totalPayment }: Props) => {
  return (
    <CardContent>
      <Typography variant="body2" gutterBottom>
        <b>Inicio:</b> {startOrder}
      </Typography>
      <Typography variant="body2" gutterBottom>
        <b>N° personas:</b> {clients}
      </Typography>

      <Badge
        type={status === IN_PROGRESS ? 'success' : 'default'}
        label={status === IN_PROGRESS ? `S/ ${totalPayment}` : 'Vacio'}
      />
    </CardContent>
  )
}

export default OrderBody
