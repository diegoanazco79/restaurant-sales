import {
  Stack, MenuItem, ListItemIcon, Typography, useTheme
} from '@mui/material'

import { type Product } from 'pages/products/interfaces/Products'
import DeleteIcon from '@mui/icons-material/Delete'

interface Props {
  product: Product
  setOpen: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>
  onDeleteProduct: (product: string) => void
}

const ProductActions = ({ product, setOpen, onDeleteProduct }: Props) => {
  const { palette } = useTheme()

  const productId = product?._id ?? ''

  return (
    <Stack sx={{ p: 1 }}>
      <MenuItem
        sx={{ px: 1 }}
        onClick={(ev) => {
          ev.stopPropagation()
          onDeleteProduct(productId)
          setOpen(null)
        }}
      >
        <ListItemIcon>
          <DeleteIcon sx={{ color: palette.error.main }} fontSize="small" />
        </ListItemIcon>
        <Typography sx={{ color: palette.error.main }} variant="body2">
          Eliminar
        </Typography>
      </MenuItem>
    </Stack>
  )
}

export default ProductActions
