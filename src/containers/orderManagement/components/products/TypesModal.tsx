import { useState } from 'react'
import { Box, Button, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'

import { pxToRem } from 'theme/helpers/functions'

import { type Order } from 'containers/orderManagement/interfaces/Order'
import { type Product, type ProductType } from 'pages/products/interfaces/Products'

interface Props {
  selectedProduct: Product
  setShowTypesModal: (value: boolean) => void
  onAddOrder: (order: Order) => void
}

const TypesModal = ({ selectedProduct, setShowTypesModal, onAddOrder }: Props) => {
  const [selectedType, setSelectedType] = useState<ProductType>(selectedProduct?.types?.[0] ?? undefined)

  const handleAddProduct = () => {
    const newOrder = {
      id: selectedProduct._id ?? '',
      name: selectedProduct.name,
      price: selectedType.price ?? 0,
      type: selectedType,
      amount: 1
    }
    onAddOrder(newOrder)
    setShowTypesModal(false)
  }

  return (
    <Box>
      <Typography variant='body2' fontWeight={600} gutterBottom>
        Seleccione el tipo del producto
      </Typography>
      <RadioGroup
        defaultValue={selectedProduct?.types?.at(0)?._id}
        sx={{ mb: 2 }}
      >
        {selectedProduct.types.map((type, idx) => (
          <FormControlLabel
            key={idx}
            value={type._id}
            sx={{ width: 'fit-content', height: pxToRem(30) }}
            control={<Radio size='small' onChange={() => { setSelectedType(type) }} />}
            label={<Typography variant='body2'>{type.name}</Typography>}
          />
        ))}
      </RadioGroup>
      <Box display='flex' justifyContent='space-between'>
        <Button variant='contained' color='inherit' onClick={() => { setShowTypesModal(false) }}>
            Cancelar
        </Button>
        <Button variant='contained' color='primary' onClick={handleAddProduct}>
            Agregar producto
        </Button>
      </Box>
    </Box>
  )
}

export default TypesModal
