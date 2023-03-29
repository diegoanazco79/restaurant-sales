import React from 'react'
import { ListItemIcon, MenuItem, Stack, Typography, useTheme } from '@mui/material'

import { type TableType } from '../interfaces/Tables'
import { EMPTY, IN_PROGRESS } from '../helpers/constants'
import BlockIcon from '@mui/icons-material/Block'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

interface Props {
  table: TableType
  status: string
  onDeleteTable: (idTable: string) => void
  setOpen: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>
  setShowEditModal: (open: boolean) => void
  setCurrentTableEdit: React.Dispatch<React.SetStateAction<TableType>>
  onBlockTable: (idTable: string) => void
  onUnlockTable: (idTable: string) => void
}

const TableActions = ({
  table, status,
  setOpen, setShowEditModal, setCurrentTableEdit,
  onDeleteTable, onBlockTable, onUnlockTable
}: Props) => {
  const { palette } = useTheme()

  return (
    <Stack sx={{ p: 1 }}>
      <MenuItem
        sx={{ px: 1 }}
        onClick={() => {
          setCurrentTableEdit(table)
          setShowEditModal(true)
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
          [EMPTY, IN_PROGRESS].includes(status) ? onBlockTable(table?.id) : onUnlockTable(table?.id)
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
          onDeleteTable(table?.id)
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

export default TableActions
