import { Container, LinearProgress } from '@mui/material'

import Filters from './components/Filters'
import Modal from 'components/modal/Modal'
import ProductManagement from './components/productManagement/ProductManagement'
import ProductsTable from './components/ProductsTable'
import TitlePage from 'components/titlePage'

import useProducts from './hooks/useProducts'

const ProductsPage = () => {
  const {
    productsList, currentPage, currentProduct, showEditModal, showAddModal,
    filters, appliedFilters, loadingProducts, totalPages, categoriesList,
    loadingCategories, refetchingProducts, refetchingCategories,
    setShowEditModal, setShowAddModal, setCurrentProduct,
    onSelectProduct, onSearchProduct, onDeleteProduct, onEditProduct,
    onEditProductType, onAddProductType, onDeleteProductType,
    onAddProduct, onFilterByCategory, onDeleteCategoryFilter,
    handleChangePage, onDeleteAllProductsType
  } = useProducts()

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
      <Filters {...filtersProps} />
      {loadingProducts || loadingCategories || refetchingProducts || refetchingCategories
        ? <LinearProgress />
        : <ProductsTable {...productsTableProps} />
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
