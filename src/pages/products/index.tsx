import { Container } from '@mui/material'

import Filters from './components/Filters'
import ProductsTable from './components/ProductsTable'
import TitlePage from 'components/titlePage'

import useProducts from './hooks/useProducts'

const ProductsPage = () => {
  const {
    productsList, currentPage, rowsPerPage, currentProduct,
    showProductModal,
    setShowProductModal,
    handleChangePage, handleChangeRowsPerPage, onSelectProduct,
    onDeleteProduct, onEditProduct, onEditProductType, onAddProductType,
    onDeleteProductType
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
    onSelectProduct,
    onEditProduct,
    onEditProductType,
    onAddProductType,
    onDeleteProductType,
    onDeleteProduct
  }

  return (
    <Container maxWidth='xl' sx={{ height: '100%' }}>
      <TitlePage title='Gestión de Productos'/>
      <Filters />
      <ProductsTable {...productsTableProps} />
    </Container>
  )
}

export default ProductsPage
