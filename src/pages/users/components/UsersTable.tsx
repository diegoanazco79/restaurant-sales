import { useState } from 'react'
import {
  Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
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
  handleChangePage: (event: unknown, newPage: number) => void
  onSelectUser: (user: User) => void
  onEditUser: (user: User, setShow: React.Dispatch<React.SetStateAction<boolean>>) => void
}

const UsersTable = ({
  users, currentPage, currentUser, totalPages,
  handleChangePage,
  onSelectUser, onEditUser
}: Props) => {
  const [showEditModal, setShowEditModal] = useState(false)

  const userRowProps = { setShowEditModal, onSelectUser }

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
