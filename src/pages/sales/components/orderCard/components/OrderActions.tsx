import { ListItemIcon, MenuItem, Stack, Typography, useTheme } from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

interface Props {
  handleClose: () => void
}

const OrderActions = ({ handleClose }: Props) => {
  const { palette } = useTheme()

  return (
    <Stack sx={{ p: 1 }}>
      <MenuItem
        sx={{ px: 1 }}
        onClick={handleClose}>
        <ListItemIcon>
          <EditIcon fontSize="small" />
        </ListItemIcon>
        Editar
      </MenuItem>
      <MenuItem
        sx={{ px: 1 }}
        onClick={handleClose}>
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
