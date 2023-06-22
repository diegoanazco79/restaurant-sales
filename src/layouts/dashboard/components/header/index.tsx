import { Box, IconButton } from '@mui/material'

import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import StyledRoot from './components/Root'
import StyledToolbar from './components/Toolbar'
import UserMenu from './components/UserMenu'

interface Props {
  onOpenNav: () => void
}

const Header = ({ onOpenNav }: Props) => {
  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            color: 'text.primary',
            display: { lg: 'none' }
          }}
        >
          <MenuOpenIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <UserMenu />
      </StyledToolbar>
    </StyledRoot>
  )
}

export default Header
