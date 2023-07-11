import React, { useState } from 'react'
import { Popover } from '@mui/material'

import TableActions from './TableActions'
import TableBody from './tableCard/TableBody'
import TableHeader from './tableCard/TableHeader'
import { StyledTableBox } from './styled/StyledTableBox'

import { type TableType } from '../interfaces/Tables'

interface Props {
  table: TableType
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>
  setTableOrder: React.Dispatch<React.SetStateAction<TableType>>
  onSelectTable: (table: TableType) => void
  onDeleteTable: (idTable: string) => void
  onBlockTable: (newTable: TableType) => void
  onUnlockTable: (newTable: TableType) => void
}

const TableCard = ({
  table,
  setShowEditModal, setTableOrder,
  onSelectTable, onDeleteTable, onBlockTable, onUnlockTable
}: Props) => {
  const [open, setOpen] = useState<HTMLButtonElement | null>(null)

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget)
    event.stopPropagation()
  }

  const handleClose = () => {
    setOpen(null)
  }

  /* Component's Props */
  const tableHeaderProps = {
    tableName: table?.name,
    handleOpen
  }

  const tableBodyProps = {
    room: table?.room,
    status: table?.status
  }

  const tableActionsProps = {
    table,
    status: table?.status,
    setOpen,
    setShowEditModal,
    onSelectTable,
    onDeleteTable,
    onBlockTable,
    onUnlockTable
  }

  return (
    <>
      <StyledTableBox
        onClick={() => { table?.status !== 'blocked' && setTableOrder(table) }}
        status={table?.status}
      >
        <TableHeader {...tableHeaderProps} />
        <TableBody {...tableBodyProps} />
      </StyledTableBox>
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
        <TableActions {...tableActionsProps}/>
      </Popover>
    </>
  )
}

export default TableCard
