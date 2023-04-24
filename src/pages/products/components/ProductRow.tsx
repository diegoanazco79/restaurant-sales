import { IconButton, TableCell, TableRow } from '@mui/material'

import { getProductPriceLabel } from '../helpers/functions'

import { type Product, type ProductType } from '../interfaces/Products'

import DeleteIcon from '@mui/icons-material/Delete'

interface Props {
  product: Product
  setShowProductModal: React.Dispatch<React.SetStateAction<boolean>>
  onSelectProduct: (product: Product) => void
  onDeleteProduct: (product: Product['id']) => void
}

const ProductRow = ({
  product,
  setShowProductModal,
  onSelectProduct, onDeleteProduct
}: Props) => {
  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onDeleteProduct(product.id)
  }

  return (
    <TableRow
      key={product.id} hover sx={{ cursor: 'pointer' }}
      onClick={() => { onSelectProduct(product); setShowProductModal(true) }} >
      <TableCell>{product.name}</TableCell>
      <TableCell>{getProductPriceLabel(product)}</TableCell>
      <TableCell>
        {product.types.length > 0
          ? (
            <ul>
              {product.types.map((type: ProductType) => (
                <li key={type.id}>
                  {type.name} - S/. {type.price.toFixed(2)}
                </li>
              ))}
            </ul>
          )
          : 'Sin tipos'
        }
      </TableCell>
      <TableCell>{product.category?.name ?? 'Sin categoría'}</TableCell>
      <TableCell>{product.stockQuantity ?? 'Sin stock'}</TableCell>
      <TableCell>
        <IconButton onClick={handleDelete}>
          <DeleteIcon color="error" />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

export default ProductRow
