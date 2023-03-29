import React, { useState } from 'react'
import { Popover } from '@mui/material'

import { StyledTableBox } from '../styled/StyledTableBox'
import TableActions from './TableActions'
import TableBody from './tableCard/TableBody'
import TableHeader from './tableCard/TableHeader'

import { type TableType } from '../interfaces/Tables'

interface Props {
  table: TableType
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>
  setCurrentTableEdit: React.Dispatch<React.SetStateAction<TableType>>
  onDeleteTable: (idTable: string) => void
  onEditTable: (idTable: string, orderName: string, setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>) => void
  onBlockTable: (idTable: string) => void
  onUnlockTable: (idTable: string) => void
}

const TableCard = ({
  table,
  setShowEditModal, setCurrentTableEdit,
  onDeleteTable, onEditTable, onBlockTable, onUnlockTable
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
    startOrder: table?.start_order,
    ambient: table?.ambient,
    status: table?.status,
    totalPayment: table?.total_payment
  }

  const tableActionsProps = {
    table,
    status: table?.status,
    setOpen,
    setShowEditModal,
    setCurrentTableEdit,
    onDeleteTable,
    onBlockTable,
    onUnlockTable
  }

  return (
    <>
      <StyledTableBox
        onClick={() => { console.log('Click') }}
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
