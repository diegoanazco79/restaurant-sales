import { Divider, List, Typography } from '@mui/material'

import LogoutItem from './LogoutItem'
import NavItem from './NavItem'
import UserProfile from './UserProfile'

import useMenuNavigation from 'layouts/dashboard/hooks/useNavigation'
import { pxToRem } from 'theme/helpers/functions'

const NavMenu = () => {
  const { menuElements } = useMenuNavigation()

  const salesElements = menuElements?.filter((item) => item?.section === 'sales')
  const productsManagementElements = menuElements?.filter((item) => item?.section === 'productsManagement')
  const peopleElements = menuElements?.filter((item) => item?.section === 'people')
  const reportsElements = menuElements?.filter((item) => item?.section === 'reports')

  return (
    <>
      <UserProfile />
      <List sx={{
        '&& .Mui-selected, && .Mui-selected:hover': {
          backgroundColor: 'rgba(145, 158, 171, 0.16)',
          '&, & .MuiTypography-root': {
            color: 'rgb(33, 43, 54)',
            fontWeight: 600
          }
        }
      }}>
        {/* Sales section */}
        <Typography variant='caption' pl={3} fontWeight={600}>Ventas</Typography>
        {salesElements?.map((item, idx) => (
          <NavItem
            key={idx}
            id={item?.id}
            name={item?.name ?? ''}
            to={item?.to ?? ''}
            icon={item?.icon}
          />
        ))}
        <Divider sx={{ mt: 1, mb: 2, mx: pxToRem(24) }}/>
        {/* Products management section */}
        <Typography variant='caption' pl={3} fontWeight={600}>Gestión de Productos</Typography>
        {productsManagementElements?.map((item, idx) => (
          <NavItem
            key={idx}
            id={item?.id}
            name={item?.name ?? ''}
            to={item?.to ?? ''}
            icon={item?.icon}
          />
        ))}
        <Divider sx={{ mt: 1, mb: 2, mx: pxToRem(24) }}/>
        {/* People section */}
        <Typography variant='caption' pl={3} fontWeight={600}>Personas</Typography>
        {peopleElements?.map((item, idx) => (
          <NavItem
            key={idx}
            id={item?.id}
            name={item?.name ?? ''}
            to={item?.to ?? ''}
            icon={item?.icon}
          />
        ))}

        <Divider sx={{ mt: 1, mb: 2, mx: pxToRem(24) }}/>
        {/* Rerpots section */}
        <Typography variant='caption' pl={3} fontWeight={600}>Reportes</Typography>
        {reportsElements?.map((item, idx) => (
          <NavItem
            key={idx}
            id={item?.id}
            name={item?.name ?? ''}
            to={item?.to ?? ''}
            icon={item?.icon}
          />
        ))}
      </List>
      <List sx={{
        mt: 'auto',
        pt: '5rem',
        pb: '1.5rem',
        '&& .Mui-selected, && .Mui-selected:hover': {
          backgroundColor: 'rgba(145, 158, 171, 0.16)',
          '&, & .MuiTypography-root': {
            color: 'rgb(33, 43, 54)',
            fontWeight: 600
          }
        }
      }}>
        <LogoutItem />
      </List>
    </>
  )
}

export default NavMenu
