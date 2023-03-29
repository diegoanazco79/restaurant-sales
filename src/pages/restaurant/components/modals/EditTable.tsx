import { Box, Button, Stack } from '@mui/material'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'

import Input from 'components/form/Input'
import Select, { type Option } from 'components/form/Select'

import { type TableType } from 'pages/restaurant/interfaces/Tables'
import { ambientsMock } from 'pages/restaurant/mock/ambientsMock'

interface FormValues {
  tableName: string
  ambient: Option | null
}

type SetSubmitting = (isSubmitting: boolean) => void
type ResetForm = () => void

interface Props {
  table: TableType
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>
  onEditTable: (
    idTable: string,
    tableName: string,
    setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>
  ) => void
}

const EditTable = ({
  table,
  setShowEditModal, onEditTable
}: Props) => {
  const validationSchema = Yup.object({
    tableName: Yup.string().required('* Este campo es obligatorio'),
    ambient: Yup.object().nullable().required('* Este campo es obligatorio')
  })

  const initialValues = {
    tableName: table?.name,
    ambient: null
  }

  const handleEditTable = (
    values: FormValues,
    setSubmitting: SetSubmitting,
    resetForm: ResetForm
  ) => {
    onEditTable(table?.id, values.tableName, setShowEditModal)
    setSubmitting(false)
    resetForm()
  }

  console.log(table)

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        handleEditTable(values, setSubmitting, resetForm)
      }}
    >
      {({ values, handleSubmit, setFieldValue }) => {
        return (
          <Form>
            <Stack spacing={2}>
              <Input
                label='Nombre de Mesa'
                name="tableName"
                placeholder="Escribe aquí el nombre de tu mesa"
              />
              <Select
                label="Ambiente"
                placeholder='Busque o seleccione el ambiente'
                name="ambient"
                options={ambientsMock}
                onChange={(
                  event: React.SyntheticEvent<Element, Event>,
                  value: Option | null
                ) => {
                  setFieldValue('ambient', value)
                }}
                value={values.ambient}
              />
              <Box display='flex' justifyContent='space-between'>
                <Button
                  variant='contained'
                  color='inherit'
                  onClick={() => { setShowEditModal(false) }}
                >
                  Cancelar
                </Button>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                >
                  Editar
                </Button>
              </Box>
            </Stack>
          </Form>
        )
      }}
    </Formik>
  )
}

export default EditTable
