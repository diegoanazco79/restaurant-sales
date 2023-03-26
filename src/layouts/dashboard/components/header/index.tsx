import { Box, IconButton } from '@mui/material'

import StyledRoot from './components/Root'
import StyledToolbar from './components/Toolbar'

import MenuOpenIcon from '@mui/icons-material/MenuOpen'
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

      </StyledToolbar>
    </StyledRoot>
  )
}

export default Header
