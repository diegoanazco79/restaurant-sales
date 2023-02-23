import { useEffect } from 'react'
import { Box, Drawer, useMediaQuery, useTheme } from '@mui/material'

import NavMenu from './components/NavMenu'

import { NAV_WIDTH } from 'theme/helpers/constants'

interface Props {
  openNavbar: boolean
  onCloseNavbar: () => void
}

const Navbar = ({ openNavbar, onCloseNavbar }: Props) => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))

  useEffect(() => {
    if (openNavbar) {
      onCloseNavbar()
    }
  }, []); //eslint-disable-line

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH }
      }}
    >
      {isDesktop
        ? <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed'
            }
          }}
        >
          <NavMenu />
        </Drawer>
        : <Drawer
          open={openNavbar}
          onClose={onCloseNavbar}
          ModalProps={{
            keepMounted: true
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH }
          }}
        >
          <NavMenu />
        </Drawer>
      }
    </Box>
  )
}

export default Navbar
