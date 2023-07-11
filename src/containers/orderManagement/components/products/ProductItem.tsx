import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material'

import ProductButton from './styled/ProductButton'

import { type Order } from 'containers/orderManagement/interfaces/Order'
import { type Product, type ProductType } from 'pages/products/interfaces/Products'

interface Props {
  product: Product
  setSelectedProduct: (product: Product) => void
  setShowTypesModal: (value: boolean) => void
  onAddOrder: (order: Order) => void
}

const ProductItem = ({
  product,
  setSelectedProduct, setShowTypesModal,
  onAddOrder
}: Props) => {
  const theme = useTheme()
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md'))

  const { _id, name, price, types, isInfinite, createdAt, updatedAt } = product ?? {}

  const getTypeWithLowestPrice = (types: ProductType[]) => {
    const sortedTypes = types.sort((a, b) => a.price - b.price)
    return sortedTypes[0].price
  }

  const handleSelectProduct = () => {
    if (types.length > 0) {
      setShowTypesModal(true)
      setSelectedProduct({ _id, name, price, types, isInfinite, createdAt, updatedAt })
    } else {
      onAddOrder({ id: _id ?? '', name, price: price ?? 0, amount: 1 })
    }
  }

  return (
    <ProductButton
      container
      onClick={() => { handleSelectProduct() }}
    >
      <Grid item xs={9} sm={9} md={4}>
        <Box display='flex' flexDirection='column'>
          <Typography variant="body2" fontWeight={600}>
            {name}
          </Typography>
          {isMobileOrTablet && (
            <Box display='flex' flexWrap='wrap'>
              {types.map((type, idx) => (
                <Typography key={idx} variant="caption" pr='2px'>
                  {type.name}
                  {idx !== types.length - 1 && ', '}
                </Typography>
              ))}
            </Box>
          )}
        </Box>
      </Grid>
      {!isMobileOrTablet && (
        <Grid item md={6}>
          <Box display='flex' flexWrap='wrap'>
            {types.length === 0 && '-'}
            {types.map((type, idx) => (
              <Typography key={idx} variant="body2" pr='2px'>
                {type.name}
                {idx !== types.length - 1 && ', '}
              </Typography>
            ))}
          </Box>
        </Grid>
      )}
      <Grid item xs={3} sm={3} md={2}>
        <Typography variant='body2' fontWeight={600}>
          {types.length > 0 ? `S/ ${getTypeWithLowestPrice(types)} ` : `S/ ${price ?? 0}`}
        </Typography>
      </Grid>
    </ProductButton>
  )
}

export default ProductItem
