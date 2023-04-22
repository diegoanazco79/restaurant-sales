import { useState } from 'react'
import { Box } from '@mui/material'

import Modal from 'components/modal/Modal'
import ProductItem from './ProductItem'
import SearchInput from 'components/searchInput'
import TypesModal from './TypesModal'

import { initialProduct } from 'containers/orderManagement/helpers/constants'
import { type Order } from 'containers/orderManagement/interfaces/Order'
import { type Product } from 'pages/products/interfaces/Products'

import productsMock from 'pages/products/mock/productsMock'

interface Props {
  onAddOrder: (order: Order) => void
}

const ProductSelection = ({ onAddOrder }: Props) => {
  const [selectedProduct, setSelectedProduct] = useState<Product>(initialProduct)
  const [showTypesModal, setShowTypesModal] = useState(false)

  /* Component's Props */
  const productItemProps = {
    setSelectedProduct,
    setShowTypesModal,
    onAddOrder
  }

  const typeModalProps = {
    selectedProduct,
    setShowTypesModal,
    onAddOrder
  }

  return (
    <>
      <SearchInput
        placeholder="Escribe para buscar un producto"
        sx={{ marginTop: 1 }}
      />
      <Box
        px={0}
        mt={1}
        overflow="auto"
        height="70%"
        display="flex"
        flexDirection="column"
      >
        {productsMock.map((product, idx) => (
          <ProductItem
            key={idx}
            id={product.id}
            name={product.name}
            price={product.price}
            types={product.types}
            isInfinite={product.isInfinite}
            {...productItemProps}
          />
        ))}
      </Box>
      <Modal
        open={showTypesModal}
        setOpen={setShowTypesModal}
        title={`Tipos del producto ${selectedProduct?.name ?? ''}`}
      >
        <TypesModal {...typeModalProps}/>
      </Modal>
    </>
  )
}

export default ProductSelection
