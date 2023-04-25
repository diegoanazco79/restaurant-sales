import { Box, IconButton } from '@mui/material'
import { useLocation } from 'react-router-dom'

import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import SearchInput from 'components/searchInput'
import StyledRoot from './components/Root'
import StyledToolbar from './components/Toolbar'

import useCategories from 'pages/categories/hooks/useCategories'
import useProducts from 'pages/products/hooks/useProducts'
import useResponsive from 'helpers/hooks/useResponsive'
import useRestaurant from 'pages/restaurant/hooks/useRestaurant'
interface Props {
  onOpenNav: () => void
}

const Header = ({ onOpenNav }: Props) => {
  const { pathname } = useLocation()
  const { isMobileOrTablet } = useResponsive()

  const { onSearchProduct } = useProducts()
  const { onSearchTable } = useRestaurant()
  const { onSearchCategory } = useCategories()

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
            {pathname === '/categories' &&
              <SearchInput
                placeholder='Buscar una categoría'
                onChange={onSearchCategory}
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
