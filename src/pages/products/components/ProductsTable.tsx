import { useState } from 'react'
import {
  Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TablePagination, TableRow
} from '@mui/material'

import Modal from 'components/modal/Modal'
import ProductManagement from './productManagement/ProductManagement'
import ProductRow from './ProductRow'

import { labelDisplayedRows } from '../helpers/functions'

import { producTableRows } from '../helpers/constants'
import { type ProductType, type Product } from '../interfaces/Products'

interface Props {
  products: Product[]
  currentPage: number
  rowsPerPage: number
  currentProduct: Product
  handleChangePage: (event: unknown, newPage: number) => void
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSelectProduct: (product: Product) => void
  onEditProduct: (product: Product, setShow: React.Dispatch<React.SetStateAction<boolean>>) => void
  onEditProductType: (typeId: ProductType['id'], newType: ProductType) => void
  onAddProductType: (type: ProductType) => void
  onDeleteProductType: (iProduct: number) => void
  onDeleteProduct: (product: Product['id']) => void
}

const ProductsTable = ({
  products, currentPage, rowsPerPage, currentProduct,
  handleChangePage, handleChangeRowsPerPage, onSelectProduct,
  onDeleteProduct, onEditProduct, onEditProductType, onAddProductType,
  onDeleteProductType
}: Props) => {
  const [showProductModal, setShowProductModal] = useState(false)

  /* Component's Props */
  const productManagementProps = {
    actionType: 'edit',
    product: currentProduct,
    setShowProductModal,
    onFinishModal: onEditProduct,
    onEditProductType,
    onAddProductType,
    onDeleteProductType
  }

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
                    onSelectProduct={onSelectProduct}
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
        title='Editar producto'
      >
        <ProductManagement {...productManagementProps}/>
      </Modal>
    </>
  )
}

export default ProductsTable
