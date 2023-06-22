import { Box, Button, Stack } from '@mui/material'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'

import Input from 'components/form/Input'

import { type Order } from 'containers/orderManagement/interfaces/Order'
import { type ProductType } from 'pages/products/interfaces/Products'

interface Props {
  currentOrder: Order | undefined
  setShowNoteModal: (show: boolean) => void
  onAddNote: (note: string, type: ProductType['_id']) => void
}

const NoteModal = ({ currentOrder, setShowNoteModal, onAddNote }: Props) => {
  const currentNote = currentOrder?.note ?? ''
  const currentType = currentOrder?.type ?? { _id: '', name: '', price: 0 }

  const validationSchema = Yup.object({
    note: Yup.string().required('* Este campo es obligatorio')
  })

  const initialValues = {
    note: currentNote
  }

  const handleDeleteOrder = () => {
    onAddNote('', currentType?._id)
    setShowNoteModal(false)
  }

  const handleAddOrderNote = (
    values: { note: string }
  ) => {
    onAddNote(values?.note, currentType?._id)
    setShowNoteModal(false)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        handleAddOrderNote(values)
      }}
    >
      {({ values, handleSubmit, setFieldValue }) => (
        <Form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Input
              label="Nota del producto"
              name="note"
              placeholder="Escribe aquí la nota del producto"
            />

            <Box display="flex" justifyContent="space-between">
              {currentNote !== '' && (
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={() => { handleDeleteOrder() }}
                >
                Eliminar nota
                </Button>
              )}
              <Button
                type="submit" variant="contained" color="primary"
                sx={{ marginLeft: currentNote !== '' ? '' : 'auto' }}
              >
                {currentNote !== '' ? 'Editar Nota' : 'Añadir nota'}
              </Button>
            </Box>
          </Stack>
        </Form>
      )}
    </Formik>
  )
}

export default NoteModal
