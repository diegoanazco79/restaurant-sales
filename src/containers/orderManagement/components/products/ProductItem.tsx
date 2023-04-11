import { Grid, Typography } from '@mui/material'

import ProductButton from './styled/ProductButton'
import { type Order } from 'containers/orderManagement/interfaces/Order'

interface Props {
  id: string
  name: string
  price: number
  onAddOrder: (order: Order) => void
}

const ProductItem = ({ id, name, price, onAddOrder }: Props) => {
  return (
    <ProductButton
      id={`product-${id}`}
      container
      onClick={() => { onAddOrder({ id, name, price, amount: 1 }) }}
    >
      <Grid item md={10}>
        <Typography variant="body2" fontWeight={600}>
          {name}
        </Typography>
      </Grid>
      <Grid item md={2}>
        <Typography variant="body2" fontWeight={600}>
          S/ {price}
        </Typography>
      </Grid>
    </ProductButton>
  )
}

export default ProductItem
