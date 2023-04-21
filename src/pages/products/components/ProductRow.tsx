import { IconButton, TableCell, TableRow } from '@mui/material'

import { getProductPrice } from '../helpers/functions'

import { type Product, type ProductType } from '../interfaces/Products'

import DeleteIcon from '@mui/icons-material/Delete'

interface Props {
  product: Product
  onEditProduct: (product: Product) => void
  onDeleteProduct: (product: Product['id']) => void
}

const ProductRow = ({ product, onEditProduct, onDeleteProduct }: Props) => {
  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onDeleteProduct(product.id)
  }

  return (
    <TableRow
      key={product.id} hover sx={{ cursor: 'pointer' }}
      onClick={() => { onEditProduct(product) }} >
      <TableCell>{product.name}</TableCell>
      <TableCell>S/ {getProductPrice(product)}</TableCell>
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
          : '-'
        }
      </TableCell>
      <TableCell>{product.category?.name ?? '-'}</TableCell>
      <TableCell>{product.stockQuantity ?? '-'}</TableCell>
      <TableCell>
        <IconButton onClick={handleDelete}>
          <DeleteIcon color="error" />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

export default ProductRow
