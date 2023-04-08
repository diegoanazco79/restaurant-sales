import { Grid, Typography } from '@mui/material'

import { ProductItemButton } from '../styled/ProductItem'
import { type Order } from 'containers/orderManagement/interfaces/Order'

interface Props {
  id: string
  name: string
  price: number
  onAddOrder: (order: Order) => void
}

const Item = ({ id, name, price, onAddOrder }: Props) => {
  return (
    <ProductItemButton
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
    </ProductItemButton>
  )
}

export default Item
