import { Divider, Typography } from '@mui/material'

import Badge from 'components/badge'
import DeliveryCard from '../styled/DeliveryCard'
import { type DeliveryOrder } from 'pages/delivery/interfaces/DeliveryOrder'

interface Props {
  id: string
  deliveryOrder: DeliveryOrder
  client: string
  address: string
  cellPhone: string
  paymentType: string
  provider: string
  totalPayment: number
  status: string
  onSelectDelivery: (delivery: DeliveryOrder) => void
}

const DeliveryItem = ({
  id, deliveryOrder, client, address, cellPhone, paymentType, provider,
  totalPayment, status,
  onSelectDelivery
}: Props) => {
  return (
    <DeliveryCard
      id={`delivery-card-${id}`}
      onClick={() => { onSelectDelivery(deliveryOrder) }}
    >
      <Typography variant='body2' gutterBottom>
        <b>Cliente:</b> {client}
      </Typography>
      <Typography variant='body2' gutterBottom>
        <b>Dirección:</b> {address}
      </Typography>
      <Typography variant='body2' gutterBottom>
        <b>Celular:</b> {cellPhone}
      </Typography>
      <Divider sx={{ my: 1 }} />
      <Typography variant='body2' gutterBottom>
        <b>Tipo de Pago:</b> {paymentType}
      </Typography>
      <Typography variant='body2' gutterBottom>
        <b>Proveedor:</b> {provider}
      </Typography>
      <Typography variant='body2' gutterBottom>
        <b>Total a Pagar:</b> S/ {totalPayment}
      </Typography>
      <Divider sx={{ my: 1 }} />
      <Typography variant='body2' gutterBottom>
        <b>Estado:</b>
      </Typography>
      <Badge type='warning' label={status} />
    </DeliveryCard>
  )
}

export default DeliveryItem
