import { IconButton, TableCell, TableRow, Tooltip } from '@mui/material'

import { type Invoice } from '../interfaces/Invoices'
import CancelIcon from '@mui/icons-material/Cancel'
import DescriptionIcon from '@mui/icons-material/Description'

interface Props {
  invoice: Invoice
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>
  onSelectInvoice: (invoice: Invoice) => void
  onCancelInvoice: (invoiceId: Invoice['id']) => void
}

const InvoiceRow = ({ invoice, setShowEditModal, onSelectInvoice, onCancelInvoice }: Props) => {
  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onCancelInvoice(invoice.id)
  }

  return (
    <TableRow hover sx={{ cursor: 'pointer' }}
      onClick={() => { onSelectInvoice(invoice); setShowEditModal(true) }} >

      <TableCell>{invoice.id}</TableCell>
      <TableCell>{invoice.invoiceType}</TableCell>
      <TableCell>{invoice.date}</TableCell>
      <TableCell>{invoice.client?.name}</TableCell>
      <TableCell>{invoice.totalAmount}</TableCell>
      <TableCell>
        <Tooltip title='Descargar boleta/factura'>
          <IconButton>
            <DescriptionIcon color="primary" />
          </IconButton>
        </Tooltip>
        <Tooltip title='Anular boleta/factura'>
          <IconButton onClick={handleCancel}>
            <CancelIcon color="error" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  )
}

export default InvoiceRow
