import { Grid } from '@mui/material'
import ActionButton from './styled/ActionButton'

const OrdersActions = () => {
  return (
    <>
      <Grid container marginTop={1} spacing={2}>
        <Grid
          item
          md={6}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ActionButton variant='contained' color='inherit'>
            Cancelar
          </ActionButton>
        </Grid>
        <Grid
          item
          md={6}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ActionButton variant='contained' color='primary'>
            Guardar y enviar a cocina
          </ActionButton>
        </Grid>
      </Grid>
    </>
  )
}

export default OrdersActions
