import { Box, Stack, Typography } from '@mui/material'

import { type Sale } from '../interfaces/Sales'

interface Props {
  currentSale: Sale
}

const SaleInfo = ({ currentSale }: Props) => {
  return (
    <Stack spacing={2} >
      <Typography variant='body2'><b>Cliente:</b> {currentSale.client.name} </Typography>
      <Box>
        <Typography variant='body2' fontWeight={600}>Productos:</Typography>
        <Box pl={2} display='flex' flexDirection='column'>
          <Typography variant='body2'>- Producto 01</Typography>
          <Typography variant='body2'>- Producto 02</Typography>
          <Typography variant='body2'>- Producto 03</Typography>
        </Box>
      </Box>
      <Typography variant='body2'> <b>Total:</b> S/ {currentSale.totalAmount.toFixed(2)} </Typography>
      <Typography variant='body2'> <b>Fecha:</b> {currentSale.date} </Typography>
      <Typography variant='body2'> <b>Boleta/Factura:</b> {currentSale.invoice} </Typography>
      <Typography variant='body2'> <b>Usuario:</b> {currentSale.user.username} </Typography>
    </Stack>
  )
}

export default SaleInfo
