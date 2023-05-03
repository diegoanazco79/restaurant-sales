import { IconButton, TableCell, TableRow, Tooltip } from '@mui/material'

import { type Sale } from '../interfaces/Sales'
import DeleteIcon from '@mui/icons-material/Delete'
import DescriptionIcon from '@mui/icons-material/Description'

interface Props {
  sale: Sale
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>
  onSelectSale: (sale: Sale) => void
  onDeleteSale: (saleId: Sale['id']) => void
}

const SaleRow = ({ sale, setShowEditModal, onSelectSale, onDeleteSale }: Props) => {
  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onDeleteSale(sale.id)
  }

  return (
    <TableRow hover sx={{ cursor: 'pointer' }}
      onClick={() => { onSelectSale(sale); setShowEditModal(true) }} >

      <TableCell>{sale.id}</TableCell>
      <TableCell>{sale.client.name}</TableCell>
      <TableCell>{sale.typeSale}</TableCell>
      <TableCell>S/ {sale.totalAmount.toFixed(2)}</TableCell>
      <TableCell>{sale.date}</TableCell>
      <TableCell>{sale.invoice}</TableCell>
      <TableCell>{sale.user.username}</TableCell>
      <TableCell>
        <Tooltip title='Descargar boleta/factura'>
          <IconButton>
            <DescriptionIcon color="primary" />
          </IconButton>
        </Tooltip>
        <IconButton onClick={handleDelete}>
          <DeleteIcon color="error" />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

export default SaleRow
