import { Box, Typography } from '@mui/material'

import Badge from 'components/badge'

import {
  BLOCKED,
  IN_PROGRESS,
  EMPTY
} from 'pages/restaurant/helpers/constants'
import { type Room } from 'pages/restaurant/interfaces/Tables'

interface Props {
  room: Room
  status: string
}

const TableBody = ({ room, status }: Props) => {
  return (
    <Box pt={2}>
      {status === EMPTY && <Badge type="default" label="Vacía" />}
      {status === IN_PROGRESS && (
        <>
          <Typography variant="body2" gutterBottom>
            <b>Inicio:</b>
          </Typography>
          <Typography variant="body2" gutterBottom>
            <b>Ambiente:</b> {room.name}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <b>Total a pagar:</b> S/
          </Typography>
        </>
      )}
      {status === BLOCKED && <Badge type="error" label="Bloqueado" />}
    </Box>
  )
}

export default TableBody
