import {
  Box,
  Pagination,
  Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Typography
} from '@mui/material'

import ProductRow from './ProductRow'

import { producTableRows } from '../helpers/constants'
import { type Product } from '../interfaces/Products'

interface Props {
  products: Product[]
  totalPages: number
  currentPage: number
  setShowProductModal: React.Dispatch<React.SetStateAction<boolean>>
  onSelectProduct: (product: Product) => void
  onDeleteProduct: (product: string) => void
  handleChangePage: (event: unknown, newPage: number) => void
}

const ProductsTable = ({
  products, currentPage, totalPages,
  setShowProductModal,
  onSelectProduct, onDeleteProduct, handleChangePage
}: Props) => {
  /* Component's Props */
  const productRowProps = {
    setShowProductModal,
    onSelectProduct,
    onDeleteProduct
  }

  return (
    <>
      {products.length > 0
        ? (
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
                  {products.map((product, idx) => (
                    <ProductRow
                      key={idx}
                      product={product}
                      {...productRowProps}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {totalPages > 1 && (
              <Pagination
                sx={{ display: 'flex', justifyContent: 'center', py: '1rem' }}
                onChange={handleChangePage}
                page={currentPage}
                count={totalPages}
                variant="outlined"
                color="primary"
              />
            )}
          </Paper>
        )
        : (
          <Box display='flex' mt={5} justifyContent='center' width='100%'>
            <Typography variant="h5" align="center">
              No hay productos que coincidan con tus filtros
            </Typography>
          </Box>
        )}
    </>
  )
}

export default ProductsTable
