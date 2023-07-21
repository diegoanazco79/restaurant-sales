import { Box, Button, Divider, Typography } from '@mui/material'

interface Props {
  orderId: string
  onCancelResturantOrder: (orderId: string) => void
}

const Title = ({ orderId, onCancelResturantOrder }: Props) => {
  return (
    <>
      {orderId !== 'new'
        ? (
          <Box display='flex' alignItems='center' justifyContent='space-between'>
            <Typography variant='h4'>Administración del Pedido</Typography>
            <Button variant='contained' color='error' onClick={() => { onCancelResturantOrder(orderId) }}>
              Cancelar Orden
            </Button>
          </Box>
        )
        : <Typography variant='h4'>Administración del Pedido</Typography>
      }
      <Divider sx={{ mb: 2, mt: 1 }} />
    </>
  )
}

export default Title
