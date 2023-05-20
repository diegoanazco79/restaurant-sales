import { Button, CircularProgress, Stack, Typography } from '@mui/material'
import { type UseMutateFunction } from '@tanstack/react-query'
import * as Yup from 'yup'

import { Form, Formik } from 'formik'

import Input from 'components/form/Input'

interface Props {
  loadingForgotPassword: boolean
  errorForgotPassword: boolean
  onForgotPassword: UseMutateFunction<any, unknown, string, unknown>
}

const EmailForm = ({
  loadingForgotPassword, errorForgotPassword,
  onForgotPassword
}: Props) => {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Ingresa un correo electrónico válido')
      .required('* Este campo es obligatorio')
  })

  const initialValues = {
    email: ''
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Recupera tu contraseña
      </Typography>
      <Typography variant="body2" gutterBottom>
        Por favor ingresa tu correo electrónico para recuperar tu contraseña
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => { onForgotPassword(values.email) }}
        validationSchema={validationSchema}
      >
        {() => {
          return (
            <Form>
              <Stack spacing={2}>
                <Input
                  label="Correo electrónico"
                  name="email"
                  type="text"
                  placeholder="Ingresa tu correo electrónico"
                />

                {errorForgotPassword && (
                  <Typography variant="body2" color="error" mt='0 !important'>
                    * El correo electrónico no existe
                  </Typography>
                )}

                <Button
                  disabled={loadingForgotPassword} fullWidth type="submit" variant="contained"
                  endIcon={loadingForgotPassword ? <CircularProgress size={10} /> : null }
                >
                  {loadingForgotPassword ? 'Enviando correo' : 'Recuperar contraseña'}
                </Button>
              </Stack>
            </Form>
          )
        }}
      </Formik>
    </>
  )
}

export default EmailForm
