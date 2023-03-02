import { type Dispatch, type SetStateAction } from 'react'
import { ListItemIcon, MenuItem, Stack, Typography, useTheme } from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

interface Props {
  idOrder: string
  onDeleteOrder: (idOrder: string) => void
  setOpen: Dispatch<SetStateAction<HTMLButtonElement | null>>
  setOpenEditModal: (open: boolean) => void
}

const OrderActions = ({
  idOrder,
  setOpen,
  setOpenEditModal,
  onDeleteOrder
}: Props) => {
  const { palette } = useTheme()

  return (
    <Stack sx={{ p: 1 }}>
      <MenuItem
        sx={{ px: 1 }}
        onClick={() => { setOpenEditModal(true) }}>
        <ListItemIcon>
          <EditIcon fontSize="small" />
        </ListItemIcon>
        Editar
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
