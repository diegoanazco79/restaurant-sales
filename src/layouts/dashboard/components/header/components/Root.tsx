import { styled, alpha } from '@mui/material/styles'
import { AppBar } from '@mui/material'

import { NAV_WIDTH } from 'theme/helpers/constants'

const StyledRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.default, 0.8),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`
  }
}))

export default StyledRoot
