import {
  Stack, MenuItem, ListItemIcon, Typography, useTheme
} from '@mui/material'

import { type Product } from 'pages/products/interfaces/Products'
import DeleteIcon from '@mui/icons-material/Delete'

interface Props {
  product: Product
  setOpen: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>
  onDeleteProduct: (product: Product['id']) => void
}

const ProductActions = ({ product, setOpen, onDeleteProduct }: Props) => {
  const { palette } = useTheme()
  return (
    <Stack sx={{ p: 1 }}>
      <MenuItem
        sx={{ px: 1 }}
        onClick={(ev) => {
          ev.stopPropagation()
          onDeleteProduct(product?.id)
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
