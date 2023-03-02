import { Box, Button, Divider, Stack, Typography } from '@mui/material'
import { type Dispatch, type SetStateAction } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'

import Input from 'components/form/Input'

interface Props {
  idOrder: string
  orderName: string
  setOpenEditModal: Dispatch<SetStateAction<boolean>>
  onEditOrder: (idOrder: string, orderName: string, setOpenEditModal: Dispatch<SetStateAction<boolean>>) => void
}

const EditOrder = ({
  idOrder, orderName,
  setOpenEditModal, onEditOrder
}: Props) => {
  const validationSchema = Yup.object({
    orderName: Yup.string().required('* Este campo es obligatorio')
  })

  const initialValues = {
    orderName
  }

  return (
    <>
      <Typography variant='h5'>Editar Orden</Typography>
      <Divider sx={{ mb: 2 }} />
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => { onEditOrder(idOrder, values.orderName, setOpenEditModal) }}
        validationSchema={validationSchema}
      >
        {() => {
          return (
            <Form>
              <Stack spacing={2}>
                <Input
                  label='Nombre de Orden'
                  name="orderName"
                  placeholder="Escribe aquí el nombre de tu orden"
                />
                <Box display='flex' justifyContent='space-between'>
                  <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                  >
                    Editar
                  </Button>
                  <Button
                    variant='contained'
                    color='inherit'
                    onClick={() => { setOpenEditModal(false) }}
                  >
                      Cancelar
                  </Button>
                </Box>
              </Stack>
            </Form>
          )
        }}
      </Formik>
    </>
  )
}

export default EditOrder
