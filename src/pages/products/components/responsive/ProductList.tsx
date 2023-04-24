import { useState } from 'react'
import { Grid, Popover, Typography } from '@mui/material'

import Modal from 'components/modal/Modal'
import ProductActions from './ProductActions'
import ProductBody from './ProductBody'
import ProductCard from './styled/ProductCard'
import ProductManagement from '../productManagement/ProductManagement'

import { type ProductType, type Product } from 'pages/products/interfaces/Products'
import AddIcon from '@mui/icons-material/Add'

interface Props {
  products: Product[]
  currentProduct: Product
  onSelectProduct: (product: Product) => void
  onAddProduct: (product: Product, setShow: React.Dispatch<React.SetStateAction<boolean>>) => void
  onEditProduct: (product: Product, setShow: React.Dispatch<React.SetStateAction<boolean>>) => void
  onEditProductType: (typeId: ProductType['id'], newType: ProductType) => void
  onAddProductType: (type: ProductType) => void
  onDeleteProductType: (iProduct: number) => void
  onDeleteProduct: (product: Product['id']) => void
}

const ProductList = ({
  products, currentProduct,
  onSelectProduct, onEditProduct, onEditProductType, onAddProductType,
  onDeleteProductType, onDeleteProduct, onAddProduct
}: Props) => {
  const [open, setOpen] = useState<HTMLButtonElement | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget)
    event.stopPropagation()
  }

  const handleClose = () => {
    setOpen(null)
  }

  /* Component's Props */
  const commonModalProps = {
    onEditProductType,
    onAddProductType,
    onDeleteProductType
  }

  const editProductModalProps = {
    product: currentProduct,
    actionType: 'edit',
    setShowProductModal: setShowEditModal,
    onFinishModal: onEditProduct,
    ...commonModalProps
  }

  const addProductModalProps = {
    actionType: 'create',
    setShowProductModal: setShowAddModal,
    onFinishModal: onAddProduct,
    ...commonModalProps
  }

  return (
    <>
      <Grid container spacing={3} pb={10}>
        <Grid item xs={12} sm={6} md={3}>
          <ProductCard
            display="flex" flexDirection="column" alignItems="center" justifyContent="center"
            onClick={() => { setShowAddModal(true) }}
          >
            <AddIcon sx={{ height: '115px', width: '115px', opacity: '0.3' }} />
            <Typography variant="body1"> Añadir nueva producto </Typography>
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
      <Modal
        open={showEditModal}
        setOpen={setShowEditModal}
        title='Editar producto'
      >
        <ProductManagement {...editProductModalProps}/>
      </Modal>
      <Modal
        open={showAddModal}
        setOpen={setShowAddModal}
        title='Añadir producto'
      >
        <ProductManagement {...addProductModalProps}/>
      </Modal>
    </>
  )
}

export default ProductList
