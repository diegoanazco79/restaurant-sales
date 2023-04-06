import { Grid, Typography, useTheme } from '@mui/material'

const HeaderColumns = () => {
  const theme = useTheme()

  return (
    <Grid
      container
      direction='row'
      alignItems='center'
      paddingBottom={1}
      sx={{ borderBottom: `1px solid ${theme.palette.grey[300]}` }}
    >
      <Grid item xs={1} sm={1} md={1}>
      </Grid>
      <Grid item xs={5} sm={6} md={6}>
        <Typography variant='body2' fontWeight={600}> Nombre</Typography>
      </Grid>
      <Grid item xs={3} sm={3} md={3}>
        <Typography
          variant='body2'
          fontWeight={600}
          alignItems='center'
        > Cantidad
        </Typography>
      </Grid>
      <Grid item xs={3} sm={2} md={2}>
        <Typography variant='body2' fontWeight={600}> Precio </Typography>
      </Grid>
    </Grid>

  )
}

export default HeaderColumns
