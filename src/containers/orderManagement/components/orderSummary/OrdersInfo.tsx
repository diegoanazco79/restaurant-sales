import { Grid, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'

interface Props {
  totalOrder: number
}

const OrdersInfo = ({ totalOrder }: Props) => {
  const theme = useTheme()
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <>
      <Grid container marginTop={3} marginBottom={1}>
        <Grid item xs={3} sm={3} md={6}>
          <Typography variant="body2" fontWeight={600}>
        Observaciones
          </Typography>
        </Grid>
        <Grid item xs={9} sm={9} md={6} paddingRight={isMobileOrTablet ? 0 : 4}>
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
