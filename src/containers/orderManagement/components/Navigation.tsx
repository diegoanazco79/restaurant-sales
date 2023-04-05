import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'

import FirstPageIcon from '@mui/icons-material/FirstPage'
import FastfoodIcon from '@mui/icons-material/Fastfood'

interface Props {
  onBackAction: () => void
}

const Navigation = ({ onBackAction }: Props) => {
  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
      >
        <BottomNavigationAction
          label="Volver"
          icon={<FirstPageIcon />}
          onClick={onBackAction}
        />
        <BottomNavigationAction
          label="Productos"
          icon={<FastfoodIcon />}
          onClick={onBackAction}
        />
      </BottomNavigation>
    </Paper>
  )
}

export default Navigation
