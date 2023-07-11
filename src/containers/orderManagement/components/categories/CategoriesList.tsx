import { Box, LinearProgress, Typography } from '@mui/material'

import CategoriesLayout from './styled/CategoriesLayout'
import CategoryItem from './CategoryItem'

import { type Category } from 'pages/categories/interfaces/Category'

import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined'

interface Props {
  categories: Category[]
  currentCategory: string
  loadingCategories: boolean
  onSelectCategory: (categoryId: string) => void
}

const CategoriesList = ({
  categories, currentCategory, loadingCategories,
  onSelectCategory
}: Props) => {
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="center">
        <FastfoodOutlinedIcon />
        <Typography variant="body2" marginLeft={1} fontWeight={600}>
          Categorias y Productos
        </Typography>
      </Box>
      {loadingCategories
        ? <LinearProgress />
        : <CategoriesLayout>
          <CategoryItem
            id="all-categories"
            name="Todos"
            selected={currentCategory === 'all-categories'}
            onSelectCategory={onSelectCategory}
          />
          {categories?.map((category, idx) => (
            <CategoryItem
              key={idx}
              id={category._id}
              name={category.name}
              selected={currentCategory === category._id}
              onSelectCategory={onSelectCategory}
            />
          ))}
        </CategoriesLayout>
      }
    </>
  )
}

export default CategoriesList
