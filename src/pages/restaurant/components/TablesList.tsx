import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Grid, Typography } from '@mui/material'

import { StyledTableBox } from './styled/StyledTableBox'
import NewTable from './NewTable'
import TableBody from './TableBody'

import { BLOCKED } from '../helpers/constants'
import { type TableType } from '../interfaces/Tables'

interface Props {
  tables?: TableType[]
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>
  onSelectTable: (table: TableType) => void
  onDeleteTable: (tableId: TableType['_id']) => void
  onBlockTable: (newTable: TableType) => void
  onUnlockTable: (newTable: TableType) => void
}

const TablesList = ({
  tables,
  setShowAddModal,
  onSelectTable, onDeleteTable, onBlockTable, onUnlockTable
}: Props) => {
  const navigate = useNavigate()

  const tableActionsProps = {
    onSelectTable,
    onDeleteTable,
    onBlockTable,
    onUnlockTable
  }

  const onManageOrder = (table: TableType) => {
    navigate(`/restaurant/${table._id ?? ''}/order/${table.order?._id ?? 'new'}`)
  }

  return (
    <>
      <Grid container spacing={3} pb={10}>
        {tables && tables?.length > 0
          ? (
            <>
              <Grid item xs={12} sm={6} md={3}>
                <NewTable isEmpty={false} setShowAddModal={setShowAddModal} />
              </Grid>
              {tables?.map((table, idx) => (
                <Grid
                  item key={idx} xs={12} sm={6} md={3}
                  onClick={(ev) => {
                    ev.stopPropagation()
                    table.status !== BLOCKED && onManageOrder(table)
                  }}
                >
                  <StyledTableBox status={table.status} height="100% !important">
                    <TableBody table={table} {...tableActionsProps} />
                  </StyledTableBox>
                </Grid>
              ))}
            </>
          )
          : (
            <Box display='flex' mt={5} justifyContent='center' width='100%'>
              <Typography variant="h5" align="center">
                No hay mesas que coincidan con tu búsqueda
              </Typography>
            </Box>
          )}
      </Grid>
    </>
  )
}

export default TablesList
