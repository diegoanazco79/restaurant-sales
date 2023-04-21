import {
  Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TablePagination, TableRow
} from '@mui/material'

import Modal from 'components/modal/Modal'
import ProductRow from './ProductRow'

import { labelDisplayedRows } from '../helpers/functions'

import { producTableRows } from '../helpers/constants'
import { type Product } from '../interfaces/Products'

interface Props {
  products: Product[]
  currentPage: number
  rowsPerPage: number
  currentProduct: Product
  showProductModal: boolean
  setShowProductModal: React.Dispatch<React.SetStateAction<boolean>>
  handleChangePage: (event: unknown, newPage: number) => void
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
  onEditProduct: (product: Product) => void
  onDeleteProduct: (product: Product['id']) => void
}

const ProductsTable = ({
  products, currentPage, rowsPerPage, showProductModal,
  setShowProductModal,
  handleChangePage, handleChangeRowsPerPage, onEditProduct,
  onDeleteProduct
}: Props) => {
  return (
    <>
      <Paper>
        <TableContainer sx={{ maxHeight: '65vh' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {producTableRows.map((row, idx) => (
                  <TableCell key={idx}>{row.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {products
                .slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
                .map((product, idx) => (
                  <ProductRow
                    key={idx}
                    product={product}
                    onEditProduct={onEditProduct}
                    onDeleteProduct={onDeleteProduct}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={currentPage}
          labelRowsPerPage="Productos por página"
          labelDisplayedRows={labelDisplayedRows}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Modal
        open={showProductModal}
        setOpen={setShowProductModal}
        title='Agregar producto'
      >
        <div>Modal content</div>
      </Modal>
    </>
  )
}

export default ProductsTable
