import moment from 'moment'
import { useState } from 'react'
import { Box, Typography, IconButton, Popover } from '@mui/material'

import Badge from 'components/badge'
import TableActions from './TableActions'

import { BLOCKED, EMPTY, IN_PROGRESS } from '../helpers/constants'
import { type TableType } from '../interfaces/Tables'

import MoreVertIcon from '@mui/icons-material/MoreVert'

interface Props {
  table: TableType
  onSelectTable: (table: TableType) => void
  onDeleteTable: (idTable: string) => void
  onBlockTable: (newTable: TableType) => void
  onUnlockTable: (newTable: TableType) => void
}

const TableBody = ({ table, onSelectTable, onDeleteTable, onBlockTable, onUnlockTable }: Props) => {
  const [open, setOpen] = useState<HTMLButtonElement | null>(null)

  const { name, status, room } = table

  const totalPrice = table.order?.total_price ?? 0
  const startTime = moment(table.order?.start_time).format('hh:mm A') ?? ''

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setOpen(event.currentTarget)
  }

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setOpen(null)
  }

  const tableActionsProps = {
    table,
    status: table?.status,
    setOpen,
    onSelectTable,
    onDeleteTable,
    onBlockTable,
    onUnlockTable
  }

  return (
    <>
      <Box display='flex' alignItems='center' justifyContent='space-between'>
        <Typography variant='h6'>{name}</Typography>
        <IconButton onClick={handleOpen} sx={{ p: 0 }} >
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box pt={2}>
        {status === EMPTY && (
          <>
            <Typography variant="body2" gutterBottom>
              <b>Ambiente:</b> {room.name}
            </Typography>
            <Badge type="default" label="Vacía" />
          </>
        )}
        {status === IN_PROGRESS && (
          <>
            <Typography variant="body2" gutterBottom>
              <b>Inicio:</b> {startTime}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <b>Ambiente:</b> {room.name}
            </Typography>
            {totalPrice > 0 && (
              <Typography variant= "body2" gutterBottom>
                <b>Total a pagar:</b> S/ {totalPrice}
              </Typography>
            )}
          </>
        )}
        {status === BLOCKED && <Badge type="error" label="Bloqueado" />}
      </Box>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            width: 'fit-content',
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75
            }
          }
        }}
      >
        <TableActions {...tableActionsProps} />
      </Popover>
    </>
  )
}

export default TableBody
