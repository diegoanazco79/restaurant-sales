import { Box, Button, CircularProgress, Typography } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ErrorMessage, Form, Formik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import Swal from 'sweetalert2'

import CategoryManagement from 'containers/categoryManagement'
import Input from 'components/form/Input'
import Modal from 'components/modal/Modal'
import Select, { type Option } from 'components/form/Select'
import StockSelection from './StockSelection'
import TypesList from './TypesList'
import TypesSelection from './TypesSelection'

import useCategoryApi from 'api/services/useCategoryApi'
import { formatCategoryToSelect, formatCategory, getProductPrice, formatCategories } from '../../helpers/functions'

import { initialProduct } from '../../helpers/constants'
import { type ProductType, type Product } from '../../interfaces/Products'
import { initialFilters } from 'pages/categories/helpers/constants'
import { type Category } from 'pages/categories/interfaces/Category'

interface FormValues {
  productName: string
  price: string | number
  types: ProductType[]
  category: Option | null
  stockQuantity: number
}

interface Props {
  actionType: string
  product: Product
  setShowProductModal: React.Dispatch<React.SetStateAction<boolean>>
  onFinishModal: (product: Product) => void
  onEditProductType: (typeId: ProductType['_id'], newType: ProductType) => void
  onAddProductType: (type: ProductType) => void
  onDeleteProductType: (iProduct: number) => void
  onDeleteAllProductsType: (setHastTypes: React.Dispatch<React.SetStateAction<boolean>>) => void
}

const ProductManagement = ({
  actionType, product,
  setShowProductModal,
  onFinishModal, onEditProductType, onAddProductType, onDeleteProductType,
  onDeleteAllProductsType
}: Props) => {
  const [hasTypes, setHasTypes] = useState(product.types.length !== 0)
  const [hasStock, setHasStock] = useState(product.types.length > 0 ? false : !product.isInfinite)
  const [currentCategory, setCurrentCategory] = useState(formatCategoryToSelect(product.category ?? null))
  const [showCategoryModal, setShowCategoryModal] = useState(false)

  const { getAllCategories, createCategory } = useCategoryApi()

  const createCategoryMutation = useMutation({
    mutationFn: async (formValues: Category) =>
      await createCategory(formValues.name)
  })

  const { data: categoriesList, isLoading: loadingCategories } = useQuery({
    queryKey: ['categories', createCategoryMutation],
    queryFn: async () => await getAllCategories(initialFilters)
  })

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

  /**
   * Handles when user want to add a new category.
   * @param {Category} newCategory - Category to add
   */
  const onAddCategory = async (newCategory: Category) => {
    await Swal.fire({
      title: '¿Estas seguro de añadir esta categoría?',
      icon: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Sí, añadir',
      cancelButtonText: 'No, cancelar',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          await createCategoryMutation.mutateAsync(newCategory)
          return { isConfirmed: true }
        } catch (error) {
          return { isConfirmed: false }
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then(async (result) => {
      if (result?.value?.isConfirmed) {
        setShowCategoryModal(false)
        await Swal.fire({
          title: '¡Categoría creada!',
          text: 'Su categoría ha sido creada correctamente',
          icon: 'success'
        })
      } else if (!result.isDismissed) {
        await Swal.fire({
          title: 'Oops...',
          text: 'Algo salió mal, por favor vuelve a intentarlo. Si el problema persiste comunícate con soporte',
          icon: 'error'
        })
      }
    })
  }

  const handleSubmit = (values: FormValues) => {
    const newProduct = {
      ...(actionType === 'edit' && { _id: product?._id ?? '' }),
      name: values.productName,
      types: hasTypes ? product?.types ?? [] : [],
      ...(!hasTypes && { price: Number(values.price) }),
      ...(currentCategory && {
        category: formatCategory(currentCategory) ?? formatCategory(values.category)
      }),
      ...(!hasTypes && { isInfinite: !hasStock }),
      ...(hasStock && { stockQuantity: values.stockQuantity }),
      updatedAt: product?.updatedAt ?? '',
      createdAt: product?.createdAt ?? ''
    }
    onFinishModal(newProduct)
  }

  /* Component's Props */
  const typesListProps = {
    product,
    onEditProductType,
    onDeleteProductType,
    onAddProductType
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => { handleSubmit(values) }}
      >
        {({ handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <Input
              className={{ mb: 2 }}
              label="Nombre"
              name="productName"
              placeholder="Escribe aquí el nombre de tu producto"
            />

            <TypesSelection
              hasTypes={hasTypes}
              setHasTypes={setHasTypes}
              setHasStock={setHasStock}
              onDeleteAllProductsType={onDeleteAllProductsType}
              product={product}
            />
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

            {loadingCategories
              ? <CircularProgress size={5} />
              : (
                <Select
                  label="Categoría"
                  placeholder='Busque o seleccione una categoría'
                  name="category"
                  options={[{ id: 'none', label: 'Ninguna' }, ...formatCategories(categoriesList)]}
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

              )}

            <Box display='flex' alignItems='center' mt='1px !important' mb={2}>
              <Typography variant='caption'>¿No encuentras una categoría en el listado?</Typography>
              <Button
                variant='text' sx={{ width: 'fit-content', mt: '0 !important' }}
                onClick={() => { setShowCategoryModal(true) }}
              >
              + Añadir categoría
              </Button>
            </Box>

            {!hasTypes && <StockSelection hasStock={hasStock} setHasStock={setHasStock} /> }

            {hasStock && product.types.length === 0 && (
              <Input
                label="Stock"
                name="stockQuantity"
                placeholder="Escribe aquí el stock de tu producto"
              />
            )}

            <Box display="flex" justifyContent="space-between" pt={4}>
              <Button
                variant="contained" color="inherit"
                onClick={() => { setShowProductModal(false) }}
              >
                Cancelar
              </Button>
              <Button type="submit" variant="contained" color="primary">
                {actionType === 'create' ? 'Añadir' : 'Editar'}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      <Modal
        open={showCategoryModal}
        setOpen={setShowCategoryModal}
        title= 'Añadir categoría'
      >
        <CategoryManagement
          actionType='create'
          setShow={setShowCategoryModal}
          onFinishModal={onAddCategory}
        />
      </Modal>
    </>
  )
}

export default ProductManagement
