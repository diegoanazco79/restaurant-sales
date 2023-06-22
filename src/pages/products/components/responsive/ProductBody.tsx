import { useState } from 'react'
import { Box, Typography, IconButton, Popover } from '@mui/material'

import ProductActions from './ProductActions'

import { getProductPriceLabel } from 'pages/products/helpers/functions'

import { type Product, type ProductType } from 'pages/products/interfaces/Products'
import MoreVertIcon from '@mui/icons-material/MoreVert'

interface Props {
  product: Product
  onDeleteProduct: (product: string) => void
}

const ProductBody = ({ product, onDeleteProduct }: Props) => {
  const [open, setOpen] = useState<HTMLButtonElement | null>(null)

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget)
    event.stopPropagation()
  }

  const handleClose = () => {
    setOpen(null)
  }

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="body1" fontWeight={600}>
          {product.name}
        </Typography>
        <IconButton onClick={handleOpen} sx={{ p: 0 }}>
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box pt={2}>
        <Typography variant="body2" gutterBottom>
          <b>Precio:</b> {getProductPriceLabel(product)}
        </Typography>
        {product.types.length > 0
          ? (
            <Box pb={1}>
              <Typography variant="body2">
                <b>Tipos:</b>
              </Typography>
              {product.types.map((type: ProductType) => (
                <Typography key={type._id} variant="body2" ml={2}>
                  <b>•</b> {type.name} - S/. {type.price.toFixed(2)}
                </Typography>
              ))}
            </Box>
          )
          : (
            <Typography variant="body2" gutterBottom>
              <b>Tipos:</b> Sin Tipos
            </Typography>
          )}
      </Box>
      <Typography variant="body2" gutterBottom>
        <b>Categoría:</b> {product.category?.name ?? 'Sin categoría'}
      </Typography>
      <Typography variant="body2" gutterBottom>
        <b>Stock:</b> {product.stockQuantity ?? 'Sin stock'}
      </Typography>

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
    </>
  )
}

export default ProductBody
