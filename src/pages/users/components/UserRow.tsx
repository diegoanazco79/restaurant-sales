import { TableCell, TableRow } from '@mui/material'

import { getLabelRole } from '../helpers/functions'

import { type User } from '../interfaces/User'

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

interface Props {
  user: User
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>
  onSelectUser: (user: User) => void
}

const UserRow = ({ user, setShowEditModal, onSelectUser }: Props) => {
  return (
    <TableRow hover sx={{ cursor: 'pointer' }}
      onClick={() => { onSelectUser(user); setShowEditModal(true) }} >

      <TableCell>{user.username}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.firstName} {user.lastName}</TableCell>
      <TableCell>{ getLabelRole(user.role.name) }</TableCell>
      <TableCell>
        {user.status === 'active'
          ? <CheckCircleOutlineIcon color="success" />
          : <CancelOutlinedIcon color="error" />
        }
      </TableCell>
    </TableRow>
  )
}

export default UserRow
