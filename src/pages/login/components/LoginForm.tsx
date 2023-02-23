import React from 'react'
import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import { Box, Button, IconButton, InputAdornment, Stack, Typography } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

import Input from 'components/form/Input'

import { type LoginFormValues } from '../interfaces/loginTypes'
import { type Organization } from '../interfaces/organizationTypes'

interface Props {
  organization: Organization | null
  showPassword: boolean
  handleClickShowPassword: () => void
  handleMouseDownPassword: (event: React.MouseEvent<HTMLButtonElement>) => void
  onSubmitLogin: (values: LoginFormValues) => void
  onBackToOrganization: () => void
}

const LoginForm = ({
  showPassword, organization,
  handleClickShowPassword, handleMouseDownPassword, onSubmitLogin,
  onBackToOrganization
}: Props) => {
  const validationSchema = Yup.object({
    username: Yup.string().required('* Este campo es obligatorio'),
    password: Yup.string().required('* Este campo es obligatorio')
  })

  const initialValues = {
    username: '',
    password: ''
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Button variant='text' onClick={onBackToOrganization}>
        {'< Volver a organización'}
      </Button>
      <Box display='flex' flexDirection='column' alignItems='center' sx={{ mb: 3 }} >
        <img width={150} src={organization?.logo} />
        <Typography variant='h4'>
          {organization?.name}
        </Typography>
        <Typography variant='body1'>
          Inicia sesión para continuar
        </Typography>
      </Box>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => { onSubmitLogin(values) }}
        validationSchema={validationSchema}
      >
        {() => {
          return (
            <Form>
              <Stack spacing={2}>
                <Input
                  label="Usuario"
                  name="username"
                  placeholder="Ingresa tu usuario"
                />

                <Input
                  label="Contraseña"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Ingresa tu contraseña"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword
                            ? <VisibilityOff fontSize='small' />
                            : <Visibility fontSize='small' />
                          }
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />

                <Button fullWidth type='submit' variant='contained'>
                  Ingresar
                </Button>
              </Stack>
            </Form>
          )
        }}
      </Formik>
    </Box>
  )
}

export default LoginForm
