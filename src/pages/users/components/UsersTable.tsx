import {
  Box,
  Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography
} from '@mui/material'

import Modal from 'components/modal/Modal'
import UserManagement from './userManagement/UserManagement'
import UserRow from './UserRow'

import { usersRows } from '../helpers/constants'
import { type User } from '../interfaces/User'

interface Props {
  users: User[]
  totalPages: number
  currentUser: User
  currentPage: number
  showEditModal: boolean
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>
  handleChangePage: (event: unknown, newPage: number) => void
  onSelectUser: (user: User) => void
  onEditUser: (user: User, setShow: React.Dispatch<React.SetStateAction<boolean>>) => void
  onActiveUser: (user: User) => void
  onDeactiveUser: (user: User) => void
}

const UsersTable = ({
  users, currentPage, currentUser, totalPages, showEditModal,
  setShowEditModal,
  handleChangePage, onSelectUser, onEditUser, onActiveUser, onDeactiveUser
}: Props) => {
  const userRowProps = {
    setShowEditModal, onSelectUser, onActiveUser, onDeactiveUser
  }

  return (
    <>
      {users?.length > 0
        ? (
          <Paper>
            <TableContainer sx={{ maxHeight: '65vh' }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {usersRows.map((row, idx) => (
                      <TableCell key={idx}>{row.label}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users?.map((user, idx) => (
                    <UserRow
                      key={idx}
                      user={user}
                      {...userRowProps}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {totalPages > 1 && (
              <Pagination
                sx={{ display: 'flex', justifyContent: 'center', py: '1rem' }}
                onChange={handleChangePage}
                page={currentPage}
                count={totalPages}
                variant="outlined"
                color="primary"
              />
            )}
          </Paper>

        )
        : (
          <Box display='flex' mt={5} justifyContent='center' width='100%'>
            <Typography variant="h5" align="center">
              No hay usuarios que coincidan con tu búsqueda
            </Typography>
          </Box>
        )}
      <Modal
        open={showEditModal}
        setOpen={setShowEditModal}
        title='Editar usuario'
      >
        <UserManagement
          actionType='edit'
          currentUser={currentUser}
          loadingRequest={false}
          setShow={setShowEditModal}
          onFinishModal={onEditUser}
        />
      </Modal>
    </>
  )
}

export default UsersTable
