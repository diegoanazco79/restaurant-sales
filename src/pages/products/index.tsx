import { Container } from '@mui/material'

import ProductsTable from './components/ProductsTable'
import TitlePage from 'components/titlePage'

import useProducts from './hooks/useProducts'

const ProductsPage = () => {
  const {
    productsList, currentPage, rowsPerPage, currentProduct,
    showProductModal,
    setShowProductModal,
    handleChangePage, handleChangeRowsPerPage, onEditProduct,
    onDeleteProduct
  } = useProducts()

  /* Components props */
  const productsTableProps = {
    products: productsList,
    currentPage,
    rowsPerPage,
    currentProduct,
    showProductModal,
    setShowProductModal,
    handleChangePage,
    handleChangeRowsPerPage,
    onEditProduct,
    onDeleteProduct
  }

  return (
    <Container maxWidth='xl' sx={{ height: '100%' }}>
      <TitlePage title='Gestión de Productos'/>
      <ProductsTable {...productsTableProps} />
    </Container>
  )
}

export default ProductsPage
