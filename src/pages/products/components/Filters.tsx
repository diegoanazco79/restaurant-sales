import { Box, Button, Grid } from '@mui/material'
import { useState } from 'react'

import Dropdown from 'components/dropdown'
import Modal from 'components/modal/Modal'
import ProductManagement from './productManagement/ProductManagement'
import SearchInput from 'components/searchInput'

import { type Product, type ProductType } from '../interfaces/Products'

interface Props {
  onAddProduct: (product: Product, setShow: React.Dispatch<React.SetStateAction<boolean>>) => void
  onEditProductType: (typeId: ProductType['id'], newType: ProductType) => void
  onAddProductType: (type: ProductType) => void
  onDeleteProductType: (iProduct: number) => void
}

const Filters = ({
  onAddProduct, onAddProductType, onEditProductType, onDeleteProductType
}: Props) => {
  const [showProductModal, setShowProductModal] = useState(false)

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
          <SearchInput placeholder='Escribe para buscar un producto'/>
        </Grid>
        <Grid item md={3} textAlign='start'>
          <Dropdown
            buttonLabel='Filtrar por categoría'
            sx={{ marginRight: 2 }}
            selected={false}
            options={[
              { label: 'Picantería', onClick: () => { console.log('Filtro') } },
              { label: 'Especiales', onClick: () => { console.log('Filtro') } },
              { label: 'Bebidas', onClick: () => { console.log('Filtro') } },
              { label: 'Postres', onClick: () => { console.log('Filtro') } }
            ]}
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
