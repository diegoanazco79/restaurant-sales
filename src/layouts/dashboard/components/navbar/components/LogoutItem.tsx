import {
  ListItemButton, ListItemIcon, ListItemText, Typography, useTheme
} from '@mui/material'

import { useAuthStore } from 'store/auth'
import { pxToRem } from 'theme/helpers/functions'

import ExitToAppIcon from '@mui/icons-material/ExitToApp'

const LogoutItem = () => {
  const theme = useTheme()
  const logout = useAuthStore((state) => state.logout)

  return (
    <ListItemButton
      sx={{
        ...theme.typography.body2,
        height: 48,
        position: 'relative',
        textTransform: 'capitalize',
        color: theme.palette.text.secondary,
        borderRadius: pxToRem(6)
      }}
      onClick={logout}
    >
      <ListItemIcon sx={{
        width: 22,
        height: 22,
        color: 'inherit',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText >
        <Typography variant="body2">Cerrar Sesión</Typography>
      </ListItemText>
    </ListItemButton>
  )
}

export default LogoutItem
