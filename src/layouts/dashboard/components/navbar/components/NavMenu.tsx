import { Box } from '@mui/material'
import NavItem from './NavItem'

const NavMenu = () => {
  return (
    <Box>
      {[1, 2, 3].map((item) => <NavItem key={item} />)}
    </Box>
  )
}

export default NavMenu
