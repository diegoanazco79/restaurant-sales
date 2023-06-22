import { Box, Button, Chip, Grid, Stack, Typography } from '@mui/material'

import Dropdown, { type Option } from 'components/dropdown'
import SearchInput from 'components/searchInput'

import { type FiltersType, type AppliedFiltersType, type Product } from '../interfaces/Products'
import { type Category } from 'pages/categories/interfaces/Category'
import { initialProduct } from '../helpers/constants'

interface Props {
  filters: FiltersType
  appliedFilters: AppliedFiltersType
  categoriesList: Category[]
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>
  setCurrentProduct: React.Dispatch<React.SetStateAction<Product>>
  onSearchProduct: (search: string) => void
  onFilterByCategory: (categoryId: string) => void
  onDeleteCategoryFilter: () => void
}

const Filters = ({
  appliedFilters, filters, categoriesList,
  setShowAddModal, setCurrentProduct,
  onFilterByCategory, onDeleteCategoryFilter, onSearchProduct
}: Props) => {
  const hasFilters = Object.values(appliedFilters).some(val => val === true)
  const hasCategoryFilter = appliedFilters?.category

  const formatCategories = categoriesList?.map((category) => ({
    id: category._id,
    label: category.name
  }))

  const categoryLabel = formatCategories?.find(category => category.id === filters.category)?.label ?? ''

  const handleOptionClick = (option: Option) => {
    onFilterByCategory(option?.id)
  }

  return (
    <Box mb={2}>
      <Grid container spacing={2}>
        <Grid item md={3}>
          <SearchInput
            placeholder='Escribe para buscar un producto'
            onChange={onSearchProduct}
          />
        </Grid>
        <Grid item md={3} textAlign='start'>
          <Dropdown
            buttonLabel='Filtrar por categoría'
            sx={{ marginRight: 2 }}
            selected={hasCategoryFilter}
            options={formatCategories}
            handleOptionClick={handleOptionClick}
          />
        </Grid>
        <Grid item md={6} textAlign='end'>
          <Button
            variant='contained' color='primary'
            onClick={() => { setShowAddModal(true); setCurrentProduct(initialProduct) }}
          >
            Añadir producto
          </Button>
        </Grid>
      </Grid>
      {hasFilters && (
        <Grid container marginTop={2}>
          <Grid item md={12} display='flex'>
            <Typography variant='body2' fontWeight={600} marginRight={1}>
              Filtros aplicados:
            </Typography>
            <Stack direction="row" spacing={1}>
              {hasCategoryFilter && (
                <Chip
                  label={`Categoría: ${categoryLabel}`}
                  onDelete={onDeleteCategoryFilter}
                />
              )}
            </Stack>
          </Grid>
        </Grid>
      )}
    </Box>
  )
}

export default Filters
