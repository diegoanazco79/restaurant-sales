import { Container } from '@mui/material'

import CategoriesList from './components/CategoriesList'
import Filters from './components/Filters'
import TitlePage from 'components/titlePage'

import useCategories from './hooks/useCategories'

const CategoriesPage = () => {
  const {
    categoriesList, currentCategory,
    onSearchCategory, onSelectCategory, onDeleteCategory
  } = useCategories()

  /* Component's Props */
  const filtersProps = {
    onSearchCategory
  }

  const categoriesListProps = {
    categories: categoriesList,
    currentCategory,
    onSelectCategory,
    onDeleteCategory
  }

  return (
    <Container maxWidth='xl' sx={{ height: '100%' }}>
      <TitlePage title='Gestion de Categorías'/>
      <Filters {...filtersProps} />
      <CategoriesList {...categoriesListProps}/>
    </Container>
  )
}

export default CategoriesPage
