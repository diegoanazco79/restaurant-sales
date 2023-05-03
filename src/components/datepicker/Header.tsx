import { Divider, Grid, Typography } from '@mui/material'

import ActionButton from './styled/ActionButton'

interface Props {
  selectedToday: boolean | null
  selectedYesterday: boolean | null
  selectedThisWeek: boolean | null
  selectedThisMonth: boolean | null
  handleToday: () => void
  handleYesterday: () => void
  handleThisWeek: () => void
  handleThisMonth: () => void
}

const Header = ({
  selectedToday, selectedYesterday, selectedThisWeek, selectedThisMonth,
  handleToday, handleYesterday, handleThisWeek, handleThisMonth
}: Props) => {
  return (
    <>
      <Grid container>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={6}>
            <ActionButton
              selected={selectedToday}
              variant="outlined"
              fullWidth
              onClick={handleToday}
            >
              Hoy
            </ActionButton>
          </Grid>
          <Grid item xs={6}>
            <ActionButton
              selected={selectedYesterday}
              variant="outlined"
              fullWidth
              onClick={handleYesterday}
            >
              Ayer
            </ActionButton>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <ActionButton
              selected={selectedThisWeek}
              variant="outlined"
              fullWidth
              onClick={handleThisWeek}
            >
              Esta semana
            </ActionButton>
          </Grid>
          <Grid item xs={6}>
            <ActionButton
              selected={selectedThisMonth}
              variant="outlined"
              fullWidth
              onClick={handleThisMonth}
            >
              Este mes
            </ActionButton>
          </Grid>
        </Grid>
        <Typography variant="caption" align="center" width="100%" my={1}>
          o selecciona una fecha personalizada
        </Typography>
      </Grid>
      <Divider />
    </>
  )
}

export default Header
