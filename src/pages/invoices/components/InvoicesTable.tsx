import { useState } from 'react'
import {
  Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TablePagination, TableRow
} from '@mui/material'

import InvoiceInfo from './InvoiceInfo'
import InvoiceRow from './InvoiceRow'
import Modal from 'components/modal/Modal'

import { labelDisplayedRows } from '../helpers/functions'

import { invoceTableRows } from '../helpers/constants'
import { type Invoice } from '../interfaces/Invoices'

interface Props {
  invoices: Invoice[]
  currentInvoice: Invoice
  currentPage: number
  rowsPerPage: number
  handleChangePage: (event: unknown, newPage: number) => void
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSelectInvoice: (invoice: Invoice) => void
  onCancelInvoice: (invoiceId: Invoice['id']) => void
}

const InvoicesTable = ({
  invoices, currentPage, rowsPerPage, currentInvoice,
  handleChangePage, handleChangeRowsPerPage,
  onSelectInvoice, onCancelInvoice
}: Props) => {
  const [showEditModal, setShowEditModal] = useState(false)

  const invoiceRowProps = {
    setShowEditModal,
    onSelectInvoice,
    onCancelInvoice
  }

  return (
    <>
      <Paper>
        <TableContainer sx={{ maxHeight: '65vh' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {invoceTableRows.map((row, idx) => (
                  <TableCell key={idx}>{row.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices
                .slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
                .map((invoice, idx) => (
                  <InvoiceRow
                    key={idx}
                    invoice={invoice}
                    {...invoiceRowProps}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={invoices.length}
          rowsPerPage={rowsPerPage}
          page={currentPage}
          labelRowsPerPage="Facturas / Boletas por página"
          labelDisplayedRows={labelDisplayedRows}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Modal
        open={showEditModal}
        setOpen={setShowEditModal}
        title='Información de Factura / Boleta'
      >
        <InvoiceInfo currentInvoice={currentInvoice} />
      </Modal>
    </>
  )
}

export default InvoicesTable
