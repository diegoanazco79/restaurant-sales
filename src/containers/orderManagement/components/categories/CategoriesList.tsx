import { Box, Typography } from '@mui/material'

import CategoryItem from './CategoryItem'
import CategoriesLayout from './styled/CategoriesLayout'

import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined'
import categoriesMock from 'containers/orderManagement/mock/categoriesMock'

const CategoriesList = () => {
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="center">
        <FastfoodOutlinedIcon />
        <Typography variant="body1" marginLeft={1} fontWeight={600}>
          Categorias y Productos
        </Typography>
      </Box>
      <CategoriesLayout>
        <CategoryItem id="all-category-btn" name="Todos" selected={true} />
        {categoriesMock.map((category, idx) => (
          <CategoryItem
            key={idx}
            id={category.id}
            name={category.name}
            selected={false}
          />
        ))}
      </CategoriesLayout>
    </>
  )
}

export default CategoriesList
