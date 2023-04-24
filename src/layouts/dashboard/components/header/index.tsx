import { Box, IconButton } from '@mui/material'
import { useLocation } from 'react-router-dom'

import StyledRoot from './components/Root'
import StyledToolbar from './components/Toolbar'

import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import SearchInput from 'components/searchInput'
import useResponsive from 'helpers/hooks/useResponsive'
import useProducts from 'pages/products/hooks/useProducts'
import useRestaurant from 'pages/restaurant/hooks/useRestaurant'
interface Props {
  onOpenNav: () => void
}

const Header = ({ onOpenNav }: Props) => {
  const { pathname } = useLocation()
  const { isMobileOrTablet } = useResponsive()

  const { onSearchProduct } = useProducts()
  const { onSearchTable } = useRestaurant()

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
        {isMobileOrTablet && (
          <>
            {pathname === '/restaurant' &&
              <SearchInput
                placeholder='Buscar una mesa'
                onChange={onSearchTable}
              />
            }
            {pathname === '/products' &&
              <SearchInput
                placeholder='Buscar un producto'
                onChange={onSearchProduct}
              />
            }
          </>
        )}
        <Box sx={{ flexGrow: 1 }} />
      </StyledToolbar>
    </StyledRoot>
  )
}

export default Header
