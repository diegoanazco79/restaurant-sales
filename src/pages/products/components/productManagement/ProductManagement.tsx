import { Box, Button, Stack } from '@mui/material'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'

import Input from 'components/form/Input'
import Select, { type Option } from 'components/form/Select'
import StockSelection from './StockSelection'
import TypesList from './TypesList'
import TypesSelection from './TypesSelection'

import { getProductPrice } from '../../helpers/functions'

import { initialProduct } from '../../helpers/constants'
import { type Product } from '../../interfaces/Products'

interface FormValues {
  productName: string
  price: string | number
  category: Option | null
  stockQuantity: number
}

interface Props {
  actionType: string
  product?: Product
}

const ProductManagement = ({ actionType, product }: Props) => {
  const [hasTypes, setHasTypes] = useState(product ? product.types.length > 0 : false)
  const [hasStock, setHasStock] = useState(product ? product.isInfinite === false : false)

  const validationSchema = Yup.object({
    productName: Yup.string().required('* Este campo es obligatorio'),
    price: Yup.number(),
    ambient: Yup.object().nullable(),
    stockQuantity: Yup.number()
  })

  const initialValues = {
    productName: product?.name ?? '',
    price: getProductPrice(product ?? initialProduct) ?? 0,
    category: null,
    stockQuantity: product?.stockQuantity ?? 0
  }

  const handleSubmit = (values: FormValues) => {
    console.log(values.productName)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleSubmit(values)
      }}
    >
      {({ values, handleSubmit, setFieldValue }) => (
        <Form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Input
              label="Nombre"
              name="productName"
              placeholder="Escribe aquí el nombre de tu producto"
            />

            <TypesSelection hasTypes={hasTypes} setHasTypes={setHasTypes} />

            {!hasTypes && (
              <Input
                label="Precio"
                name="price"
                inputLabelAdorment='S/ '
                placeholder="Escribe aquí el precio de tu producto"
              />
            )}

            {hasTypes && <TypesList product={product} /> }

            <Select
              label="Categoría"
              placeholder='Busque o seleccione una categoría'
              name="category"
              options={[{ id: 'bebidas', label: 'Bebidas' }]}
              onChange={(
                event: React.SyntheticEvent<Element, Event>,
                value: Option | null
              ) => {
                setFieldValue('category', value)
              }}
              value={values.category}
            />

            <Button variant='text' sx={{ width: 'fit-content', mt: '0 !important' }}> + Añadir categoría</Button>

            <StockSelection hasStock={hasStock} setHasStock={setHasStock} />

            {hasStock && (
              <Input
                label="Stock"
                name="stockQuantity"
                placeholder="Escribe aquí el stock de tu producto"
              />
            )}

            <Box display="flex" justifyContent="space-between" pt={4}>
              <Button variant="contained" color="inherit">
                Cancelar
              </Button>
              <Button type="submit" variant="contained" color="primary">
                {actionType === 'create' ? 'Añadir' : 'Editar'}
              </Button>
            </Box>
          </Stack>
        </Form>
      )}
    </Formik>
  )
}

export default ProductManagement
