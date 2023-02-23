import { useState } from 'react'
import { Avatar, Box, Divider, IconButton, ListItemIcon, MenuItem, Popover, Stack, Typography } from '@mui/material'

import { useAuthStore } from 'store/auth'

import ExitToAppIcon from '@mui/icons-material/ExitToApp'

const AccountPopover = () => {
  const [open, setOpen] = useState<HTMLButtonElement | null>(null)

  const profile = useAuthStore((state) => state.profile)
  const logout = useAuthStore((state) => state.logout)

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget)
  }

  const handleClose = () => {
    setOpen(null)
  }

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{ p: 0 }}
      >
        <Avatar src='https://minimal-kit-react.vercel.app/assets/images/avatars/avatar_default.jpg' alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75
            }
          }
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {profile?.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {profile?.username}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          <MenuItem
            sx={{ px: 1 }}
            onClick={() => {
              handleClose()
              logout()
            }}>
            <ListItemIcon>
              <ExitToAppIcon fontSize="small" />
            </ListItemIcon>
            Cerrar Sesión

          </MenuItem>
        </Stack>
      </Popover>
    </>
  )
}

export default AccountPopover
