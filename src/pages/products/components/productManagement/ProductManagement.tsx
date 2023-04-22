import { Box, Button, Typography } from '@mui/material'
import { ErrorMessage, Form, Formik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'

import Input from 'components/form/Input'
import Select, { type Option } from 'components/form/Select'
import StockSelection from './StockSelection'
import TypesList from './TypesList'
import TypesSelection from './TypesSelection'

import { formatCategoryToSelect, formatCategory, getProductPrice } from '../../helpers/functions'

import { initialProduct } from '../../helpers/constants'
import { categoriesMock } from 'pages/products/mock/categoriesMock'

import { type ProductType, type Product } from '../../interfaces/Products'

interface FormValues {
  productName: string
  price: string | number
  types: ProductType[]
  category: Option | null
  stockQuantity: number
}

interface Props {
  actionType: string
  product?: Product
  setShowProductModal: React.Dispatch<React.SetStateAction<boolean>>
  onEditProduct: (product: Product, setShow: React.Dispatch<React.SetStateAction<boolean>>) => void
  onEditProductType: (typeId: ProductType['id'], newType: ProductType) => void
  onAddProductType: (type: ProductType) => void
  onDeleteProductType: (iProduct: number) => void
}

const ProductManagement = ({
  actionType, product,
  setShowProductModal,
  onEditProduct, onEditProductType, onAddProductType,
  onDeleteProductType
}: Props) => {
  const [hasTypes, setHasTypes] = useState(product ? product.types.length > 0 : false)
  const [hasStock, setHasStock] = useState(product ? !product.isInfinite : false)
  const [currentCategory, setCurrentCategory] = useState(product ? formatCategoryToSelect(product.category ?? null) : null)

  const validationSchema = Yup.object({
    productName: Yup.string().required('* Este campo es obligatorio'),
    price: Yup.number().test('stock-quantity', '* El stock debe ser mayor a 0', (value) => {
      if (!hasTypes) return value ? value > 0.10 : false
      return true
    }),
    types: Yup.array().test('types', '* Debes agregar al menos un tipo', (value) => {
      if (hasTypes) return value ? value.length > 0 : false
      return true
    }),
    category: Yup.object().nullable(),
    stockQuantity: Yup.number()
  })

  const initialValues = {
    productName: product?.name ?? '',
    price: getProductPrice(product ?? initialProduct) ?? 0,
    types: product?.types ?? [],
    category: currentCategory ?? null,
    stockQuantity: product?.stockQuantity ?? 0
  }

  const handleSubmit = (values: FormValues) => {
    const editedProduct = {
      id: product?.id ?? '',
      name: values.productName,
      types: hasTypes ? product?.types ?? [] : [],
      ...(!hasTypes && { price: Number(values.price) }),
      ...(currentCategory && { category: currentCategory ?? values.category }),
      ...(!hasTypes && { isInfinite: !hasStock }),
      ...(hasStock && { stockQuantity: values.stockQuantity })
    }
    onEditProduct({ ...editedProduct, category: formatCategory(currentCategory) }, setShowProductModal)
  }

  /* Component's Props */
  const typesListProps = {
    product,
    onEditProductType,
    onDeleteProductType,
    onAddProductType
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
          <Input
            className={{ mb: 2 }}
            label="Nombre"
            name="productName"
            placeholder="Escribe aquí el nombre de tu producto"
          />

          <TypesSelection hasTypes={hasTypes} setHasTypes={setHasTypes} />
          <>
            <br/>
            <ErrorMessage name="types" className='formik-error' component='span'/>
          </>
          {!hasTypes && (
            <Input
              className={{ mb: 2 }}
              label="Precio"
              name="price"
              inputLabelAdorment='S/ '
              placeholder="Escribe aquí el precio de tu producto"
            />
          )}

          {hasTypes && <TypesList {...typesListProps} setFieldValue={setFieldValue} /> }

          <Select
            label="Categoría"
            placeholder='Busque o seleccione una categoría'
            name="category"
            options={[{ id: 'none', label: 'Ninguna' }, ...categoriesMock]}
            onChange={(
              event: React.SyntheticEvent<Element, Event>,
              value: Option | null
            ) => {
              setFieldValue('category', value)
              setCurrentCategory(value)
            }}
            value={currentCategory}
            defaultValue={{ id: 'none', label: 'Ninguna' }}
          />

          <Box display='flex' alignItems='center' mt='1px !important' mb={2}>
            <Typography variant='caption'>¿No encuentras una categoría en el listado?</Typography>
            <Button variant='text' sx={{ width: 'fit-content', mt: '0 !important' }}> + Añadir categoría</Button>
          </Box>

          {!hasTypes && <StockSelection hasStock={hasStock} setHasStock={setHasStock} /> }

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
        </Form>
      )}
    </Formik>
  )
}

export default ProductManagement
