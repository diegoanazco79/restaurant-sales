import { useState } from 'react'
import { Box, Button, Chip, Grid, Typography } from '@mui/material'

import Dropdown, { type Option } from 'components/dropdown'

import { type FiltersType, type CategoryProductType } from 'pages/products/interfaces/Products'
import { categoriesMock } from 'pages/categories/mock/categoriesMock'

interface Props {
  filters: FiltersType
  setShowFiltersModal: React.Dispatch<React.SetStateAction<boolean>>
  onApplyMobileFilters: (categoryId: CategoryProductType['id']) => void
}

const FiltersModal = ({
  filters,
  setShowFiltersModal,
  onApplyMobileFilters
}: Props) => {
  const currentCategoryFilter = categoriesMock.find(
    (category) => category.id === filters.category
  )

  const [categoryFilter, setCategoryFilter] = useState<CategoryProductType>(
    currentCategoryFilter ?? { id: '', name: '' }
  )

  const formatCategories = categoriesMock.map((category) => ({
    id: category.id,
    label: category.name
  }))

  const handleOptionClick = (option: Option) => {
    setCategoryFilter({ id: option.id, name: option.label })
  }

  const onDeleteCategoryFilter = () => {
    setCategoryFilter({ id: '', name: '' })
  }

  return (
    <Box>
      <Typography variant="body2" fontWeight={600}>
        Categoría
      </Typography>
      <Dropdown
        buttonLabel="Filtrar por categoría"
        sx={{ marginRight: 2 }}
        fullWidth
        selected={categoryFilter.name !== ''}
        options={formatCategories}
        handleOptionClick={handleOptionClick}
      />
      {categoryFilter.name !== '' && (
        <Grid container marginTop={2} display="flex" flexDirection="column">
          <Grid item md={12}>
            <Typography variant="body2" fontWeight={600} marginRight={1}>
              Filtros aplicados:
            </Typography>
          </Grid>
          <Grid item md={12} my={1}>
            {categoryFilter.name !== '' && (
              <Chip
                label={`Categoría: ${categoryFilter.name}`}
                onDelete={onDeleteCategoryFilter}
              />
            )}
          </Grid>
        </Grid>
      )}
      <Button
        variant="contained" color="primary" sx={{ mt: 2 }}
        onClick={() => {
          setShowFiltersModal(false)
          onApplyMobileFilters(categoryFilter.id)
        }}
      >
        Aplicar filtros
      </Button>
    </Box>
  )
}

export default FiltersModal
