import { Container, LinearProgress } from '@mui/material'

import Filters from './components/Filters'
import Modal from 'components/modal/Modal'
import Navigation from './components/responsive/Navigation'
import ProductList from './components/responsive/ProductList'
import ProductManagement from './components/productManagement/ProductManagement'
import ProductsTable from './components/ProductsTable'
import TitlePage from 'components/titlePage'

import useProducts from './hooks/useProducts'
import useResponsive from 'helpers/hooks/useResponsive'

const ProductsPage = () => {
  const {
    productsList, currentPage, currentProduct, showEditModal, showAddModal,
    filters, appliedFilters, loadingProducts, totalPages, categoriesList,
    loadingCategories,
    setShowEditModal, setShowAddModal, setCurrentProduct,
    onSelectProduct, onSearchProduct, onDeleteProduct, onEditProduct,
    onEditProductType, onAddProductType, onDeleteProductType,
    onAddProduct, onFilterByCategory, onDeleteCategoryFilter,
    onApplyMobileFilters, handleChangePage, onDeleteAllProductsType
  } = useProducts()

  const { isMobileOrTablet } = useResponsive()

  /* Components props */
  const productsTableProps = {
    products: productsList,
    totalPages,
    currentPage,
    setShowProductModal: setShowEditModal,
    onSelectProduct,
    onDeleteProduct,
    handleChangePage
  }

  const productListProps = {
    products: productsList,
    setShowAddModal,
    setShowEditModal,
    onSelectProduct,
    onDeleteProduct
  }

  const filtersProps = {
    filters,
    categoriesList,
    appliedFilters,
    setShowAddModal,
    setCurrentProduct,
    onSearchProduct,
    onFilterByCategory,
    onDeleteCategoryFilter
  }

  const navigationProps = {
    filters,
    appliedFilters,
    onApplyMobileFilters
  }

  const commonModalProps = {
    product: currentProduct,
    onEditProductType,
    onAddProductType,
    onDeleteProductType,
    onDeleteAllProductsType
  }

  const editProductModalProps = {
    actionType: 'edit',
    setShowProductModal: setShowEditModal,
    onFinishModal: onEditProduct,
    ...commonModalProps
  }

  const addProductModalProps = {
    actionType: 'create',
    setShowProductModal: setShowAddModal,
    onFinishModal: onAddProduct,
    ...commonModalProps
  }

  return (
    <Container maxWidth="xl" sx={{ height: '100%' }}>
      <TitlePage title="Gestión de Productos" />
      {isMobileOrTablet
        ? (
          <>
            <Navigation {...navigationProps} />
            {loadingProducts || loadingCategories
              ? <LinearProgress />
              : <ProductList {...productListProps}/>
            }
          </>
        )
        : (
          <>
            <Filters {...filtersProps} />
            {loadingProducts || loadingCategories
              ? <LinearProgress />
              : <ProductsTable {...productsTableProps} />
            }
          </>
        )
      }
      <Modal
        open={showEditModal}
        setOpen={setShowEditModal}
        title='Editar producto'
      >
        <ProductManagement {...editProductModalProps}/>
      </Modal>
      <Modal
        open={showAddModal}
        setOpen={setShowAddModal}
        title='Añadir producto'
      >
        <ProductManagement {...addProductModalProps}/>
      </Modal>
    </Container>
  )
}

export default ProductsPage
