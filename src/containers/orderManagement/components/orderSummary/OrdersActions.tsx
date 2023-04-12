import { Grid } from '@mui/material'

import ActionButton from './styled/ActionButton'

interface Props {
  isMobileOrTablet: boolean
}

const OrdersActions = ({ isMobileOrTablet }: Props) => {
  return (
    <>
      <Grid container marginTop={1} spacing={2}>
        {!isMobileOrTablet && (
          <Grid
            item
            xs={6}
            sm={6}
            md={6}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ActionButton
              isMobileOrTablet={isMobileOrTablet}
              variant="contained"
              color="inherit"
            >
              Cancelar
            </ActionButton>
          </Grid>
        )}
        <Grid
          item
          xs={isMobileOrTablet ? 12 : 6}
          sm={isMobileOrTablet ? 12 : 6}
          md={6}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ActionButton
            isMobileOrTablet={isMobileOrTablet}
            variant="contained"
            color="primary"
          >
            Guardar Orden
          </ActionButton>
        </Grid>
      </Grid>
    </>
  )
}

export default OrdersActions
