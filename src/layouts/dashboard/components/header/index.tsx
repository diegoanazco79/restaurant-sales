import { IconButton, Typography } from '@mui/material'

import StyledRoot from './components/Root'
import StyledToolbar from './components/Toolbar'

import MenuIcon from '@mui/icons-material/Menu'

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
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' }
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h4" gutterBottom>Header</Typography>
      </StyledToolbar>
    </StyledRoot>
  )
}

export default Header
