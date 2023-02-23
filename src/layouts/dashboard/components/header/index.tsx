import { Box, IconButton, Stack } from '@mui/material'

import AccountPopover from './components/AccountPopover'
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

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1
          }}
        >
          <AccountPopover/>
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  )
}

export default Header
