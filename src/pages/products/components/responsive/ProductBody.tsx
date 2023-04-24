import { Box, Typography, IconButton } from '@mui/material'

import { getProductPriceLabel } from 'pages/products/helpers/functions'

import { type Product, type ProductType } from 'pages/products/interfaces/Products'

import MoreVertIcon from '@mui/icons-material/MoreVert'

interface Props {
  product: Product
  handleOpen: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const ProductBody = ({ product, handleOpen }: Props) => {
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
                <Typography key={type.id} variant="body2" ml={2}>
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
    </>
  )
}

export default ProductBody
