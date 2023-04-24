import { Container } from '@mui/material'

import Filters from './components/Filters'
import ProductsTable from './components/ProductsTable'
import TitlePage from 'components/titlePage'

import useProducts from './hooks/useProducts'

const ProductsPage = () => {
  const {
    productsList, currentPage, rowsPerPage, currentProduct,
    filters, appliedFilters,
    handleChangePage, handleChangeRowsPerPage, onSelectProduct,
    onDeleteProduct, onEditProduct, onEditProductType, onAddProductType,
    onDeleteProductType, onAddProduct, onFilterByCategory, onDeleteCategoryFilter
  } = useProducts()

  /* Components props */
  const productsTableProps = {
    products: productsList,
    currentPage,
    rowsPerPage,
    currentProduct,
    handleChangePage,
    handleChangeRowsPerPage,
    onSelectProduct,
    onEditProduct,
    onEditProductType,
    onAddProductType,
    onDeleteProductType,
    onDeleteProduct
  }

  const filtersProps = {
    filters,
    appliedFilters,
    onFilterByCategory,
    onDeleteCategoryFilter,
    onAddProduct,
    onEditProductType,
    onAddProductType,
    onDeleteProductType
  }

  return (
    <Container maxWidth='xl' sx={{ height: '100%' }}>
      <TitlePage title='Gestión de Productos'/>
      <Filters {...filtersProps} />
      <ProductsTable {...productsTableProps} />
    </Container>
  )
}

export default ProductsPage
