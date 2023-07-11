import { useState } from 'react'
import { Box, Divider, Grid, LinearProgress, Typography, useMediaQuery, useTheme } from '@mui/material'

import Modal from 'components/modal/Modal'
import ProductItem from './ProductItem'
import SearchInput from 'components/searchInput'
import TypesModal from './TypesModal'

import { initialProduct } from 'containers/orderManagement/helpers/constants'
import { type Order } from 'containers/orderManagement/interfaces/Order'
import { type Product } from 'pages/products/interfaces/Products'

interface Props {
  productsList: Product[]
  loadingProducts: boolean
  onAddOrder: (order: Order) => void
  onSearchProduct: (name: string) => void
}

const ProductSelection = ({
  productsList, loadingProducts,
  onAddOrder, onSearchProduct
}: Props) => {
  const theme = useTheme()
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md'))

  const [selectedProduct, setSelectedProduct] = useState<Product>(initialProduct)
  const [showTypesModal, setShowTypesModal] = useState(false)

  /* Component's Props */
  const productItemProps = {
    setSelectedProduct,
    setShowTypesModal,
    onAddOrder
  }

  const typeModalProps = {
    selectedProduct,
    setShowTypesModal,
    onAddOrder
  }

  return (
    <>
      <SearchInput
        placeholder="Escribe para buscar un producto"
        onChange={onSearchProduct}
        sx={{ my: 1 }}
      />
      <Divider />
      <Grid container sx={{ my: 1 }}>
        <Grid item xs={9} sm={9} md={4}>
          <Typography variant="body2" fontWeight={600}>
            Nombre
          </Typography>
        </Grid>
        {!isMobileOrTablet && (
          <Grid item md={6}>
            <Typography variant="body2" fontWeight={600}>
              Tipos
            </Typography>
          </Grid>
        )}
        <Grid item xs={3} sm={3} md={2}>
          <Typography variant='body2' fontWeight={600}>
            Precio
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      {loadingProducts
        ? <LinearProgress sx={{ mt: 2 }} />
        : <>
          {productsList.length === 0
            ? <Box display='flex' mt={5} justifyContent='center' width='100%'>
              <Typography variant="body2" align="center">
                No hay productos que coincidan con esta categoría
              </Typography>
            </Box>
            : <Box
              px={0}
              mt={1}
              overflow="auto"
              height="70%"
              display="flex"
              flexDirection="column"
            >
              {productsList.map((product, idx) => (
                <ProductItem
                  key={idx}
                  product={product}
                  {...productItemProps}
                />
              ))}
            </Box>
          }
        </>
      }
      <Modal
        open={showTypesModal}
        setOpen={setShowTypesModal}
        title={`Tipos del producto ${selectedProduct?.name ?? ''}`}
      >
        <TypesModal {...typeModalProps}/>
      </Modal>
    </>
  )
}

export default ProductSelection
