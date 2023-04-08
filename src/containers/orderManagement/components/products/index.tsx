import { Box } from '@mui/material'

import SearchInput from 'components/searchInput'
import ProductItem from './Item'

import productsMock from 'containers/orderManagement/mock/productsMock'

const ProductSelection = () => {
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
        {productsMock.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
          />
        ))}
      </Box>
    </>
  )
}

export default ProductSelection
