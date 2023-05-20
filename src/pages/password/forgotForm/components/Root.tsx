import { styled } from '@mui/material/styles'

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}))

export default StyledRoot
