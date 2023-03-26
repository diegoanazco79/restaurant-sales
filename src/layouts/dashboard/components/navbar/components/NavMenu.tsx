import { List } from '@mui/material'

import LogoutItem from './LogoutItem'
import NavItem from './NavItem'
import UserProfile from './UserProfile'

import useMenuNavigation from 'layouts/dashboard/hooks/useNavigation'

const NavMenu = () => {
  const { menuElements } = useMenuNavigation()

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
        {menuElements?.map((item, idx) => (
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
        marginTop: 'auto',
        paddingBottom: '1.5rem',
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
