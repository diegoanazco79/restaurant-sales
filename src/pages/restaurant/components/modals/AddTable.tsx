import { type Dispatch, type SetStateAction, useState } from 'react'
import { Form, Formik } from 'formik'
import { Box, Button, Stack, Typography } from '@mui/material'
import * as Yup from 'yup'

import Input from 'components/form/Input'
import Modal from 'components/modal/Modal'
import Select, { type Option } from 'components/form/Select'
import { StyledTableBox } from '../../styled/StyledTableBox'

import AddIcon from '@mui/icons-material/Add'
import { ambientsMock } from '../../mock/ambientsMock'

interface FormValues {
  tableName: string
  ambient: Option | null
}

type SetSubmitting = (isSubmitting: boolean) => void
type ResetForm = () => void

interface Props {
  onAddTable: (
    tableName: string,
    setShow: Dispatch<SetStateAction<boolean>>
  ) => void
}

const AddTable = ({ onAddTable }: Props) => {
  const [openAddTable, setOpenAddTable] = useState(false)

  const validationSchema = Yup.object({
    tableName: Yup.string().required('* Este campo es obligatorio'),
    ambient: Yup.object().nullable().required('* Este campo es obligatorio')
  })

  const initialValues = {
    tableName: '',
    ambient: null
  }

  const handleAddTable = (
    values: FormValues,
    setSubmitting: SetSubmitting,
    resetForm: ResetForm
  ) => {
    onAddTable(values.tableName, setOpenAddTable)
    setSubmitting(false)
    resetForm()
  }

  return (
    <>
      <StyledTableBox
        status="empty"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        onClick={() => {
          setOpenAddTable(true)
        }}
      >
        <AddIcon sx={{ height: '115px', width: '115px', opacity: '0.3' }} />
        <Typography variant="body1"> Añadir nueva mesa </Typography>
      </StyledTableBox>
      <Modal title="Añadir Mesa" open={openAddTable} setOpen={setOpenAddTable}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            handleAddTable(values, setSubmitting, resetForm)
          }}
        >
          {({ values, handleSubmit, setFieldValue }) => (
            <Form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <Input
                  label="Nombre de Mesa"
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
                <Box display="flex" justifyContent="space-between">
                  <Button
                    variant="contained"
                    color="inherit"
                    onClick={() => {
                      setOpenAddTable(false)
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Añadir
                  </Button>
                </Box>
              </Stack>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  )
}

export default AddTable
