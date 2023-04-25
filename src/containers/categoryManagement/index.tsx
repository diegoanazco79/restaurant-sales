import { Box, Button } from '@mui/material'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'

import Input from 'components/form/Input'

import useCategoryManagement from './hooks/useCategoryManagement'

import { type Category } from 'pages/categories/interfaces/Category'

interface FormValues {
  categoryName: string
}

interface Props {
  actionType: string
  category?: Category
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const CategoryManagement = ({ actionType, category, setShow }: Props) => {
  const { onAddCategory, onEditCategory } = useCategoryManagement()

  const validationSchema = Yup.object({
    categoryName: Yup.string().required('* Este campo es obligatorio')
  })

  const initialValues = {
    categoryName: category?.name ?? ''
  }

  const handleSubmit = (values: FormValues) => {
    const newCategory = {
      id: category?.id ?? '',
      name: values.categoryName
    }
    if (actionType === 'create') onAddCategory(newCategory, setShow)
    else onEditCategory(newCategory, setShow)
  }

  return (
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
            name="categoryName"
            placeholder="Escribe aquí el nombre de categoría"
          />

          <Box display="flex" justifyContent="space-between" pt={4}>
            <Button
              variant="contained" color="inherit"
              onClick={() => { setShow(false) }}
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
  )
}

export default CategoryManagement
