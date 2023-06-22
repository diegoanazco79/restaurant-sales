import React from 'react'
import { Avatar, Box, IconButton, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material'

import { useAuthStore } from 'store/auth'

import ExitToAppIcon from '@mui/icons-material/ExitToApp'

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const logout = useAuthStore((state) => state.logout)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box>
      <IconButton
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Avatar
          src="https://minimal-kit-react.vercel.app/assets/images/avatars/avatar_default.jpg"
          alt="photoURL"
        />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant='body2'>Cerrar Sesión</Typography>
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default UserMenu
