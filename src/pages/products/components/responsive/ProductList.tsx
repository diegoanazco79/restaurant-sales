import { Grid, Typography } from '@mui/material'

import ProductBody from './ProductBody'
import ProductCard from './styled/ProductCard'

import { type Product } from 'pages/products/interfaces/Products'
import AddIcon from '@mui/icons-material/Add'

interface Props {
  products: Product[]
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>
  onSelectProduct: (product: Product) => void
  onDeleteProduct: (product: string) => void
}

const ProductList = ({
  products,
  setShowAddModal, setShowEditModal,
  onSelectProduct, onDeleteProduct
}: Props) => {
  return (
    <Grid container spacing={3} pb={10}>
      <Grid item xs={12} sm={6} md={3}>
        <ProductCard
          display="flex" flexDirection="column" alignItems="center" justifyContent="center"
          onClick={() => { setShowAddModal(true) }}
        >
          <AddIcon sx={{ height: '115px', width: '115px', opacity: '0.3' }} />
          <Typography variant="body1"> Añadir nuevo producto </Typography>
        </ProductCard>
      </Grid>
      {products.map((product, idx) => (
        <Grid
          item key={idx} xs={12} sm={6} md={3}
          onClick={() => {
            onSelectProduct(product)
            setShowEditModal(true)
          }}
        >
          <ProductCard height='100% !important'>
            <ProductBody product={product} onDeleteProduct={onDeleteProduct} />
          </ProductCard>
        </Grid>
      ))}
    </Grid>
  )
}

export default ProductList
