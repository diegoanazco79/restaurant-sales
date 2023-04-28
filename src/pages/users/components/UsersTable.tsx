import { useState } from 'react'
import {
  Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TablePagination, TableRow
} from '@mui/material'

import Modal from 'components/modal/Modal'
import UserManagement from './userManagement/UserManagement'
import UserRow from './UserRow'

import { labelDisplayedRows } from '../helpers/functions'

import { usersRows } from '../helpers/constants'
import { type User } from '../interfaces/User'

interface Props {
  users: User[]
  currentUser: User
  currentPage: number
  rowsPerPage: number
  handleChangePage: (event: unknown, newPage: number) => void
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSelectUser: (user: User) => void
  onEditUser: (user: User, setShow: React.Dispatch<React.SetStateAction<boolean>>) => void
  onDeleteUser: (user: User['id']) => void
}

const UsersTable = ({
  users, currentPage, rowsPerPage, currentUser,
  handleChangePage, handleChangeRowsPerPage,
  onSelectUser, onDeleteUser, onEditUser
}: Props) => {
  const [showEditModal, setShowEditModal] = useState(false)

  const userRowProps = {
    setShowEditModal,
    onSelectUser,
    onDeleteUser
  }

  return (
    <>
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
              {users
                .slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
                .map((user, idx) => (
                  <UserRow
                    key={idx}
                    user={user}
                    {...userRowProps}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={currentPage}
          labelRowsPerPage="Productos por página"
          labelDisplayedRows={labelDisplayedRows}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Modal
        open={showEditModal}
        setOpen={setShowEditModal}
        title='Editar usuario'
      >
        <UserManagement
          actionType='edit'
          currentUser={currentUser}
          setShow={setShowEditModal}
          onFinishModal={onEditUser}
        />
      </Modal>
    </>
  )
}

export default UsersTable
