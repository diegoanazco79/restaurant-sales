import { CardContent, Typography } from '@mui/material'

import Badge from 'components/badge'

const OrderBody = () => {
  return (
    <CardContent>
      <Typography variant="body2" gutterBottom>
        <b>Inicio:</b> 28 feb. 10:58am
      </Typography>
      <Typography variant="body2" gutterBottom>
        <b>N° personas:</b> 5
      </Typography>

      <Badge type='success' label='S/ 168.00' />
    </CardContent>
  )
}

export default OrderBody
