import { Box, Button, Stack } from '@mui/material'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'

import Input from 'components/form/Input'
import StockSelection from './StockSelection'

import { type Product, type ProductType } from 'pages/products/interfaces/Products'

interface FormValues {
  typeName: string
  typePrice: number
  stockQuantity: number
}

interface Props {
  product?: Product
  actionType: string
  currentType: ProductType
  setShowTypeModal: React.Dispatch<React.SetStateAction<boolean>>
  setFieldValue: (field: string, value: any) => void
  onEditProductType: (typeId: ProductType['_id'], newType: ProductType) => void
  onAddProductType: (type: ProductType) => void
}

const TypeManagement = ({
  product, actionType, currentType,
  setShowTypeModal, setFieldValue,
  onEditProductType, onAddProductType
}: Props) => {
  const [hasStock, setHasStock] = useState(currentType ? !currentType.isInfinite : false)

  const validationSchema = Yup.object({
    typeName: Yup.string().required('* Este campo es obligatorio'),
    typePrice: Yup.number().required('* Este campo es obligatorio').min(0.09, '* El precio debe ser mayor que 0.10'),
    stockQuantity: Yup.number().test('stock-quantity', '* El stock debe ser mayor a 0', (value) => {
      if (hasStock) return value ? value > 0 : false
      return true
    })
  })

  const initialValues = {
    typeName: currentType?.name ?? '',
    typePrice: currentType?.price ?? 0,
    stockQuantity: currentType?.stockQuantity ?? 0
  }

  const handleSubmitForm = (values: FormValues) => {
    const newType = {
      _id: currentType?._id ?? '',
      name: values.typeName,
      price: values.typePrice,
      isInfinite: !hasStock,
      ...(hasStock && { stockQuantity: values.stockQuantity })
    }
    if (actionType === 'create') {
      onAddProductType(newType)
      setFieldValue('types', [...product?.types ?? [], newType])
    } else {
      onEditProductType(currentType?._id, newType)
      setFieldValue('types', [...product?.types ?? [], newType])
    }
    setShowTypeModal(false)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleSubmitForm(values)
      }}
    >
      {({ values, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Input
              label="Nombre del tipo"
              name="typeName"
              placeholder="Escribe aquí el nombre del tipo"
            />

            <Input
              label="Precio del tipo"
              type='number'
              name="typePrice"
              inputLabelAdorment='S/ '
              placeholder="Escribe aquí el precio del tipo"
            />

            <StockSelection
              hasStock={hasStock}
              setHasStock={setHasStock}
            />

            {hasStock && (
              <Input
                label="Stock del tipo"
                name="stockQuantity"
                placeholder="Escribe aquí el stock del tipo"
              />
            )}

            <Box display="flex" justifyContent="space-between">
              <Button
                variant="contained" color="inherit"
                onClick={() => { setShowTypeModal(false) }}
              >
                Cancelar
              </Button>
              <Button type="submit" variant="contained" color="primary">
                {actionType === 'edit' ? 'Editar tipo' : 'Añadir tipo'}
              </Button>
            </Box>
          </Stack>
        </Form>
      )}
    </Formik>
  )
}

export default TypeManagement
