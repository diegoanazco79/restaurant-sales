import { Box, Button, Divider, Stack, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import { type Dispatch, type SetStateAction } from 'react'
import * as Yup from 'yup'

import Input from 'components/form/Input'

interface Props {
  setOpenAddOrder: Dispatch<SetStateAction<boolean>>
  onAddOrder: (orderName: string, setShow: Dispatch<SetStateAction<boolean>>) => void
}

const AddOrderModal = ({ setOpenAddOrder, onAddOrder }: Props) => {
  const validationSchema = Yup.object({
    orderName: Yup.string().required('* Este campo es obligatorio')
  })

  const initialValues = {
    orderName: ''
  }

  return (
    <>
      <Typography variant='h5'>Añadir Mesa</Typography>
      <Divider sx={{ mb: 2 }} />

      <Formik
        initialValues={initialValues}
        onSubmit={(values) => { onAddOrder(values?.orderName, setOpenAddOrder) }}
        validationSchema={validationSchema}
      >
        {() => {
          return (
            <Form>
              <Stack spacing={2}>
                <Input
                  label='Nombre de Mesa'
                  name="orderName"
                  placeholder="Escribe aquí el nombre de tu mesa"
                />
                <Box display='flex' justifyContent='space-between'>
                  <Button
                    variant='contained'
                    color='inherit'
                    onClick={() => { setOpenAddOrder(false) }}
                  >
                      Cancelar
                  </Button>
                  <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                  >
                    Añadir
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

export default AddOrderModal
