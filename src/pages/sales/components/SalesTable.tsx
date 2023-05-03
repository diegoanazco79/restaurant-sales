import { useState } from 'react'
import {
  Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TablePagination, TableRow
} from '@mui/material'

import Modal from 'components/modal/Modal'
import SaleInfo from './SaleInfo'
import SalesRow from './SalesRow'

import { labelDisplayedRows } from '../helpers/functions'

import { salesRows } from '../helpers/constants'
import { type Sale } from '../interfaces/Sales'

interface Props {
  sales: Sale[]
  currentSale: Sale
  currentPage: number
  rowsPerPage: number
  handleChangePage: (event: unknown, newPage: number) => void
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSelectSale: (sale: Sale) => void
  onDeleteSale: (saleId: Sale['id']) => void
}

const ClientsTable = ({
  sales, currentPage, rowsPerPage, currentSale,
  handleChangePage, handleChangeRowsPerPage,
  onSelectSale, onDeleteSale
}: Props) => {
  const [showEditModal, setShowEditModal] = useState(false)

  const saleRowProps = {
    setShowEditModal,
    onSelectSale,
    onDeleteSale
  }

  return (
    <>
      <Paper>
        <TableContainer sx={{ maxHeight: '65vh' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {salesRows.map((row, idx) => (
                  <TableCell key={idx}>{row.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sales
                .slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
                .map((sale, idx) => (
                  <SalesRow
                    key={idx}
                    sale={sale}
                    {...saleRowProps}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={sales.length}
          rowsPerPage={rowsPerPage}
          page={currentPage}
          labelRowsPerPage="Ventas por página"
          labelDisplayedRows={labelDisplayedRows}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Modal
        open={showEditModal}
        setOpen={setShowEditModal}
        title='Información de venta'
      >
        <SaleInfo currentSale={ currentSale} />
      </Modal>
    </>
  )
}

export default ClientsTable
