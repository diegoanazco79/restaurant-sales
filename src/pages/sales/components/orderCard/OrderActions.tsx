import { type Dispatch, type SetStateAction } from 'react'
import { ListItemIcon, MenuItem, Stack, Typography, useTheme } from '@mui/material'

import { EMPTY, IN_PROGRESS } from 'pages/sales/helpers/constants'

import BlockIcon from '@mui/icons-material/Block'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

interface Props {
  idOrder: string
  status: string
  onDeleteOrder: (idOrder: string) => void
  setOpen: Dispatch<SetStateAction<HTMLButtonElement | null>>
  setOpenEditModal: (open: boolean) => void
  onBlockOrder: (idOrder: string) => void
  onUnlockOrder: (idOrder: string) => void
}

const OrderActions = ({
  idOrder, status,
  setOpen, setOpenEditModal,
  onDeleteOrder, onBlockOrder, onUnlockOrder
}: Props) => {
  const { palette } = useTheme()

  return (
    <Stack sx={{ p: 1 }}>
      <MenuItem
        sx={{ px: 1 }}
        onClick={() => {
          setOpenEditModal(true)
          setOpen(null)
        }}>
        <ListItemIcon>
          <EditIcon fontSize="small" />
        </ListItemIcon>
        Editar
      </MenuItem>
      <MenuItem
        sx={{ px: 1 }}
        onClick={() => {
          [EMPTY, IN_PROGRESS].includes(status) ? onBlockOrder(idOrder) : onUnlockOrder(idOrder)
          setOpen(null)
        }}>
        <ListItemIcon>
          <BlockIcon
            sx={{ color: palette.warning.main }}
            fontSize="small"
          />
        </ListItemIcon>
        <Typography
          sx={{ color: palette.warning.main }}
          variant='body2'
        >
          { [EMPTY, IN_PROGRESS].includes(status) ? 'Bloquear' : 'Desbloquear'}
        </Typography>
      </MenuItem>
      <MenuItem
        sx={{ px: 1 }}
        onClick={() => {
          onDeleteOrder(idOrder)
          setOpen(null)
        }}>
        <ListItemIcon>
          <DeleteIcon
            sx={{ color: palette.error.main }}
            fontSize="small"
          />
        </ListItemIcon>
        <Typography
          sx={{ color: palette.error.main }}
          variant='body2'
        >
          Delete
        </Typography>
      </MenuItem>
    </Stack>
  )
}

export default OrderActions
