import { Divider, Typography } from '@mui/material'

import Badge from 'components/badge'
import DeliveryCard from '../styled/DeliveryCard'

interface Props {
  id: string
  client: string
  address: string
  cellPhone: string
  paymentType: string
  provider: string
  totalPayment: number
  status: string
}

const DeliveryItem = ({
  id, client, address, cellPhone, paymentType, provider,
  totalPayment, status
}: Props) => {
  return (
    <DeliveryCard id={`delivery-card-${id}`}>
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
