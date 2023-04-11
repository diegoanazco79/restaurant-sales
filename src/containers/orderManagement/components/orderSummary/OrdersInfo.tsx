import { Grid, TextField, Typography } from '@mui/material'

interface Props {
  totalOrder: number
}

const OrdersInfo = ({ totalOrder }: Props) => {
  return (
    <>
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
}

export default OrdersInfo
