import { Grid, Typography, Box } from '@mui/material'

import CategoryBody from './CategoryBody'
import CategoryCard from './styled/CategoryCard'
import NewCategory from './NewCategory'

import { type Category } from '../interfaces/Category'

interface Props {
  categories: Category[]
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>
  onDeleteCategory: (categoryId: Category['_id']) => void
  onSelectCategory: (category: Category) => void
}

const CategoriesList = ({
  categories,
  setShowAddModal, setShowEditModal,
  onSelectCategory, onDeleteCategory
}: Props) => {
  return (
    <>
      <Grid container spacing={3} pb={10}>
        {categories?.length > 0
          ? (
            <>
              <Grid item xs={12} sm={6} md={3}>
                <NewCategory isEmpty={false} setShowAddModal={setShowAddModal} />
              </Grid>
              {categories?.map((category, idx) => (
                <Grid
                  item key={idx} xs={12} sm={6} md={3}
                  onClick={(ev) => {
                    ev.stopPropagation()
                    onSelectCategory(category)
                    setShowEditModal(true)
                  }}
                >
                  <CategoryCard height="100% !important">
                    <CategoryBody category={category} onDeleteCategory={onDeleteCategory} />
                  </CategoryCard>
                </Grid>
              ))}
            </>
          )
          : (
            <Box display='flex' mt={5} justifyContent='center' width='100%'>
              <Typography variant="h5" align="center">
                No hay categorías que coincidan con tu búsqueda
              </Typography>
            </Box>
          )}
      </Grid>
    </>
  )
}

export default CategoriesList
