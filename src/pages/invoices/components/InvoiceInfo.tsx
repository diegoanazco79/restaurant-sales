import { Box, Stack, Typography } from '@mui/material'

import { type Invoice } from '../interfaces/Invoices'

interface Props {
  currentInvoice: Invoice
}

const InvoiceInfo = ({ currentInvoice }: Props) => {
  return (
    <Stack spacing={2} >
      <Typography variant='body2'><b>Cliente:</b> {currentInvoice.client.name} </Typography>
      <Box>
        <Typography variant='body2' fontWeight={600}>Productos:</Typography>
        <Box pl={2} display='flex' flexDirection='column'>
          <Typography variant='body2'>- Producto 01</Typography>
          <Typography variant='body2'>- Producto 02</Typography>
          <Typography variant='body2'>- Producto 03</Typography>
        </Box>
      </Box>
      <Typography variant='body2'> <b>Total:</b> S/ {currentInvoice.totalAmount.toFixed(2)} </Typography>
      <Typography variant='body2'> <b>Fecha:</b> {currentInvoice.date} </Typography>
      <Typography variant='body2'> <b>Usuario:</b> {currentInvoice.user.username} </Typography>
    </Stack>
  )
}

export default InvoiceInfo
