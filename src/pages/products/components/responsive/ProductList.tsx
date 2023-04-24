import { useState } from 'react'
import { Grid, Popover } from '@mui/material'

import ProductActions from './ProductActions'
import ProductBody from './ProductBody'
import ProductCard from './styled/ProductCard'

import { type Product } from 'pages/products/interfaces/Products'

interface Props {
  products: Product[]
  onDeleteProduct: (product: Product['id']) => void
}

const ProductList = ({ products, onDeleteProduct }: Props) => {
  const [open, setOpen] = useState<HTMLButtonElement | null>(null)

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget)
    event.stopPropagation()
  }

  const handleClose = () => {
    setOpen(null)
  }

  return (
    <Grid container spacing={3} pb={10}>
      {products.map((product, idx) => (
        <Grid item key={idx} xs={12} sm={6} md={3}>
          <ProductCard height='100% !important'>
            <ProductBody product={product} handleOpen={handleOpen} />
          </ProductCard>
          <Popover
            open={Boolean(open)}
            anchorEl={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              sx: {
                p: 0,
                width: 'fit-content',
                '& .MuiMenuItem-root': {
                  typography: 'body2',
                  borderRadius: 0.75
                }
              }
            }}
          >
            <ProductActions
              product={product}
              setOpen={setOpen}
              onDeleteProduct={onDeleteProduct}
            />
          </Popover>
        </Grid>
      ))}
    </Grid>
  )
}

export default ProductList
