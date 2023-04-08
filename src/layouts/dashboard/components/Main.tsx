import { styled } from '@mui/material/styles'

import { APP_BAR_DESKTOP } from 'theme/helpers/constants'

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  height: '100vh',
  paddingTop: '80px !important',
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}))

export default Main
