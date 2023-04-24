import { Box, Button, Chip, Grid, Stack, Typography } from '@mui/material'
import { useState } from 'react'

import Dropdown, { type Option } from 'components/dropdown'
import Modal from 'components/modal/Modal'
import ProductManagement from './productManagement/ProductManagement'
import SearchInput from 'components/searchInput'

import { type FiltersType, type CategoryProductType, type Product, type ProductType, type AppliedFiltersType } from '../interfaces/Products'
import { categoriesMock } from '../mock/categoriesMock'

interface Props {
  filters: FiltersType
  appliedFilters: AppliedFiltersType
  onSearchProduct: (search: string) => void
  onFilterByCategory: (categoryId: CategoryProductType['id']) => void
  onDeleteCategoryFilter: () => void
  onAddProduct: (product: Product, setShow: React.Dispatch<React.SetStateAction<boolean>>) => void
  onEditProductType: (typeId: ProductType['id'], newType: ProductType) => void
  onAddProductType: (type: ProductType) => void
  onDeleteProductType: (iProduct: number) => void
}

const Filters = ({
  appliedFilters, filters,
  onFilterByCategory, onDeleteCategoryFilter, onSearchProduct,
  onAddProduct, onAddProductType, onEditProductType, onDeleteProductType
}: Props) => {
  const [showProductModal, setShowProductModal] = useState(false)

  const hasFilters = Object.values(appliedFilters).some(val => val === true)
  const hasCategoryFilter = appliedFilters?.category

  const formatCategories = categoriesMock.map((category) => ({
    id: category.id,
    label: category.name
  }))

  const handleOptionClick = (option: Option) => {
    onFilterByCategory(option?.id)
  }

  /* Component's Props */
  const productManagementProps = {
    actionType: 'create',
    setShowProductModal,
    onFinishModal: onAddProduct,
    onEditProductType,
    onAddProductType,
    onDeleteProductType
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
            onClick={() => { setShowProductModal(true) }}
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
                  label={`Estado: ${filters.category.toString()}`}
                  onDelete={onDeleteCategoryFilter}
                />
              )}
            </Stack>
          </Grid>
        </Grid>
      )}
      <Modal
        open={showProductModal}
        setOpen={setShowProductModal}
        title='Añadir producto'
      >
        <ProductManagement {...productManagementProps}/>
      </Modal>
    </Box>
  )
}

export default Filters
