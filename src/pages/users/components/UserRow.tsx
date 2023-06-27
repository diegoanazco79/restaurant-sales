import { IconButton, TableCell, TableRow, Tooltip } from '@mui/material'

import Badge from 'components/badge'

import { getLabelRole } from '../helpers/functions'

import { type User } from '../interfaces/User'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

interface Props {
  user: User
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>
  onSelectUser: (user: User) => void
  onActiveUser: (user: User) => void
  onDeactiveUser: (user: User) => void
}

const UserRow = ({
  user,
  setShowEditModal,
  onSelectUser, onActiveUser, onDeactiveUser
}: Props) => {
  const handleInactive = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onDeactiveUser(user)
  }

  const handleActive = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onActiveUser(user)
  }

  return (
    <TableRow
      hover
      sx={{ cursor: 'pointer' }}
      onClick={() => {
        onSelectUser(user)
        setShowEditModal(true)
      }}
    >
      <TableCell>{user.username}</TableCell>
      <TableCell>
        {user.firstName} {user.lastName}
      </TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{getLabelRole(user.role.name)}</TableCell>
      <TableCell>
        {user.status === 'active'
          ? (
            <Badge label="Activo" type="success" />
          )
          : (
            <Badge label="Inactivo" type="error" />
          )}
      </TableCell>
      <TableCell>
        {user.status === 'active'
          ? (
            <Tooltip title="Desactivar usuario">
              <IconButton onClick={handleInactive}>
                <CancelOutlinedIcon color="error" />
              </IconButton>
            </Tooltip>
          )
          : (
            <Tooltip title="Activar usuario">
              <IconButton onClick={handleActive}>
                <CheckCircleOutlineIcon color="success" />
              </IconButton>
            </Tooltip>
          )}
      </TableCell>
    </TableRow>
  )
}

export default UserRow
