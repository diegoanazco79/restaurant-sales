import {
  Stack, MenuItem, ListItemIcon, Typography, useTheme
} from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'
import { type Room } from '../interfaces/Room'

interface Props {
  room: Room
  setOpen: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>
  onDeleteRoom: (roomId: Room['id']) => void
}

const RoomActions = ({ room, setOpen, onDeleteRoom }: Props) => {
  const { palette } = useTheme()
  return (
    <Stack sx={{ p: 1 }}>
      <MenuItem
        sx={{ px: 1 }}
        onClick={(ev) => {
          ev.stopPropagation()
          onDeleteRoom(room.id)
          setOpen(null)
        }}
      >
        <ListItemIcon>
          <DeleteIcon sx={{ color: palette.error.main }} fontSize="small" />
        </ListItemIcon>
        <Typography sx={{ color: palette.error.main }} variant="body2">
          Eliminar
        </Typography>
      </MenuItem>
    </Stack>
  )
}

export default RoomActions
