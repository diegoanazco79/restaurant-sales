import { Container, LinearProgress, useMediaQuery, useTheme } from '@mui/material'

import CategoriesList from './components/CategoriesList'
import CategoryManagement from 'containers/categoryManagement'
import Filters from './components/Filters'
import Modal from 'components/modal/Modal'
import TitlePage from 'components/titlePage'

import useCategories from './hooks/useCategories'
import EmptyData from './components/EmptyData'

const CategoriesPage = () => {
  const {
    categoriesList, currentCategory, loadingCategories, showAddModal,
    showEditModal, refetchingCategories,
    setShowAddModal, setShowEditModal,
    onSearchCategory, onSelectCategory, onDeleteCategory, onAddCategory,
    onEditCategory
  } = useCategories()

  const theme = useTheme()
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md'))

  /* Component's Props */
  const filtersProps = {
    onSearchCategory
  }

  const categoriesListProps = {
    categories: categoriesList,
    setShowAddModal,
    setShowEditModal,
    onSelectCategory,
    onDeleteCategory
  }

  return (
    <Container maxWidth="xl" sx={{ height: '100%' }}>
      <TitlePage title="Gestión de Categorías" />
      {!isMobileOrTablet && <Filters {...filtersProps} />}
      {loadingCategories || refetchingCategories
        ? <LinearProgress />
        : (
          <>
            {!categoriesList && !loadingCategories && !refetchingCategories
              ? <EmptyData setShowAddModal={setShowAddModal} />
              : <CategoriesList {...categoriesListProps} />
            }
          </>
        )}
      <Modal
        open={showEditModal}
        setOpen={setShowEditModal}
        title="Editar categoría"
      >
        <CategoryManagement
          actionType="edit"
          category={currentCategory}
          setShow={setShowEditModal}
          onFinishModal={onEditCategory}
        />
      </Modal>
      <Modal
        open={showAddModal}
        setOpen={setShowAddModal}
        title="Añadir categoría"
      >
        <CategoryManagement
          actionType="create"
          setShow={setShowAddModal}
          onFinishModal={onAddCategory}
        />
      </Modal>
    </Container>
  )
}

export default CategoriesPage
