import { Grid, Typography, useTheme } from '@mui/material'

import { pxToRem } from 'theme/helpers/functions'

const TypesHeader = () => {
  const theme = useTheme()
  return (
    <Grid
      container spacing={1} mt={1} ml={pxToRem(2)}
      sx={{ border: `${pxToRem(1)} solid ${theme.palette.grey[400]}` }}
    >
      <Grid item xs={4} sm={4} md={5} >
        <Typography variant='body2' fontWeight={600}>Nombre</Typography>
      </Grid>
      <Grid item xs={2} sm={2} md={2}>
        <Typography variant='body2' fontWeight={600}>Precio</Typography>
      </Grid>
      <Grid item xs={2} sm={2} md={2}>
        <Typography variant='body2' fontWeight={600}>Stock</Typography>
      </Grid>
      <Grid item xs={4} sm={4} md={3}>
      </Grid>
    </Grid>
  )
}

export default TypesHeader
