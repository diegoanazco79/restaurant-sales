import { Container } from '@mui/material'

import Filters from './components/Filters'
import Navigation from './components/responsive/Navigation'
import ProductList from './components/responsive/ProductList'
import ProductsTable from './components/ProductsTable'
import TitlePage from 'components/titlePage'

import useProducts from './hooks/useProducts'
import useResponsive from 'helpers/hooks/useResponsive'

const ProductsPage = () => {
  const {
    productsList, currentPage, rowsPerPage, currentProduct,
    filters, appliedFilters,
    handleChangePage, handleChangeRowsPerPage, onSelectProduct,
    onDeleteProduct, onEditProduct, onEditProductType, onAddProductType,
    onDeleteProductType, onAddProduct, onFilterByCategory, onDeleteCategoryFilter,
    onApplyMobileFilters
  } = useProducts()

  const { isMobileOrTablet } = useResponsive()

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

  const productListProps = {
    products: productsList,
    currentProduct,
    onSelectProduct,
    onAddProduct,
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

  const navigationProps = {
    filters,
    appliedFilters,
    onApplyMobileFilters
  }

  return (
    <Container maxWidth='xl' sx={{ height: '100%' }}>
      <TitlePage title='Gestión de Productos'/>
      {isMobileOrTablet
        ? <Navigation {...navigationProps} />
        : <Filters {...filtersProps} />
      }
      {isMobileOrTablet
        ? <ProductList {...productListProps}/>
        : <ProductsTable {...productsTableProps} />
      }
    </Container>
  )
}

export default ProductsPage
