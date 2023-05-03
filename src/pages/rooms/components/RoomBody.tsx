import { Box, Typography, IconButton } from '@mui/material'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import { type Room } from '../interfaces/Room'

interface Props {
  room: Room
  handleOpen: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const RoomBody = ({ room, handleOpen }: Props) => {
  return (
    <>
      <Box display='flex' alignItems='center' justifyContent='flex-end'>
        <IconButton onClick={handleOpen} sx={{ p: 0 }}>
          <MoreVertIcon fontSize='small' />
        </IconButton>
      </Box>
      <Box display='flex' alignItems='center' justifyContent='center' height='100%' pb={3}>
        <Typography variant='h4' fontWeight={600}>
          {room.name}
        </Typography>
      </Box>
    </>
  )
}

export default RoomBody
