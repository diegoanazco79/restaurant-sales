import { Grid, Typography } from '@mui/material'

import { ProductItemButton } from '../styled/ProductItem'

interface Props {
  id: string
  name: string
  price: number
}

const Item = ({ id, name, price }: Props) => {
  return (
    <ProductItemButton container id={`product-${id}`}>
      <Grid md={10}>
        <Typography variant="body2" fontWeight={600}>
          {name}
        </Typography>
      </Grid>
      <Grid md={2}>
        <Typography variant="body2" fontWeight={600}>
          S/ {price}
        </Typography>
      </Grid>
    </ProductItemButton>
  )
}

export default Item
