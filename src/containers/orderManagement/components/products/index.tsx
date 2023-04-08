import { Box } from '@mui/material'

import SearchInput from 'components/searchInput'
import ProductItem from './Item'

import productsMock from 'containers/orderManagement/mock/productsMock'
import { type Order } from 'containers/orderManagement/interfaces/Order'

interface Props {
  onAddOrder: (order: Order) => void
}

const ProductSelection = ({ onAddOrder }: Props) => {
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
            onAddOrder={onAddOrder}
          />
        ))}
      </Box>
    </>
  )
}

export default ProductSelection
