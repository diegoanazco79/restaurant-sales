import { IconButton, TableCell, TableRow } from '@mui/material'

import { getLabelRole } from '../helpers/functions'

import { type User } from '../interfaces/User'

import DeleteIcon from '@mui/icons-material/Delete'

interface Props {
  user: User
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>
  onSelectUser: (user: User) => void
  onDeleteUser: (user: User['id']) => void
}

const UserRow = ({
  user,
  setShowEditModal,
  onSelectUser, onDeleteUser
}: Props) => {
  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onDeleteUser(user.id)
  }

  return (
    <TableRow hover sx={{ cursor: 'pointer' }}
      onClick={() => { onSelectUser(user); setShowEditModal(true) }} >

      <TableCell>{user.username}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.firstName} {user.lastName}</TableCell>
      <TableCell>{ getLabelRole(user.role.name) }</TableCell>
      <TableCell>
        <IconButton onClick={handleDelete}>
          <DeleteIcon color="error" />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

export default UserRow
