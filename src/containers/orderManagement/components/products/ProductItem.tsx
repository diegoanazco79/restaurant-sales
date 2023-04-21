import { Box, Grid, Typography } from '@mui/material'

import ProductButton from './styled/ProductButton'

import useReponsive from 'helpers/hooks/useResponsive'

import { type Order } from 'containers/orderManagement/interfaces/Order'
import { type Product, type ProductType } from 'pages/products/interfaces/Products'

interface Props {
  id: string
  name: string
  price: number | undefined
  types: ProductType[]
  setSelectedProduct: (product: Product) => void
  setShowTypesModal: (value: boolean) => void
  onAddOrder: (order: Order) => void
}

const ProductItem = ({
  id, name, price, types,
  setSelectedProduct, setShowTypesModal,
  onAddOrder
}: Props) => {
  const { isMobileOrTablet } = useReponsive()

  const getTypeWithLowestPrice = (types: ProductType[]) => {
    const sortedTypes = types.sort((a, b) => a.price - b.price)
    return sortedTypes[0].price
  }

  const handleSelectProduct = () => {
    if (types.length > 0) {
      setShowTypesModal(true)
      setSelectedProduct({ id, name, price, types })
    } else {
      onAddOrder({ id, name, price: price ?? 0, amount: 1 })
    }
  }

  return (
    <ProductButton
      id={`product-${id}`}
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
