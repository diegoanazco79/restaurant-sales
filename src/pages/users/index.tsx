import { Container, LinearProgress } from '@mui/material'

import Filters from './components/Filters'
import TitlePage from 'components/titlePage'
import UsersTable from './components/UsersTable'

import useUsers from './hooks/useUsers'

const UsersPage = () => {
  const {
    usersList, currentPage, currentUser, isLoading, totalPages,
    onSearchUser, handleChangePage,
    onSelectUser, onEditUser, onInviteUser
  } = useUsers()

  /* Component's Props */
  const filtersProps = {
    onSearchUser, onInviteUser
  }

  const usersTableProps = {
    users: usersList,
    totalPages,
    currentUser,
    currentPage,
    handleChangePage,
    onSelectUser,
    onEditUser
  }

  return (
    <Container maxWidth='xl' sx={{ height: '100%' }}>
      <TitlePage title='Gestión de Usuarios'/>
      <Filters {...filtersProps} />
      {isLoading
        ? <LinearProgress />
        : (
          <>
            <UsersTable {...usersTableProps} />
          </>
        )}
    </Container>
  )
}

export default UsersPage
