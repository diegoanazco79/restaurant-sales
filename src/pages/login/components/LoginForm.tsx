import React from 'react'
import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import { Box, Button, CircularProgress, IconButton, InputAdornment, Stack, Typography } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

import Input from 'components/form/Input'
import Select, { type Option } from 'components/form/Select'

import { type LoginFormValues } from '../interfaces/loginTypes'
import { type Organization } from '../interfaces/organizationTypes'

interface Props {
  organization: Organization | null
  showPassword: boolean
  loadingLogin: boolean
  isValidLogin: boolean
  handleClickShowPassword: () => void
  handleMouseDownPassword: (event: React.MouseEvent<HTMLButtonElement>) => void
  onSubmitLogin: (values: LoginFormValues) => void
  onBackToOrganization: () => void
}

const LoginForm = ({
  showPassword, organization, loadingLogin, isValidLogin,
  handleClickShowPassword, handleMouseDownPassword, onSubmitLogin,
  onBackToOrganization
}: Props) => {
  const validationSchema = Yup.object({
    username: Yup.string().required('* Este campo es obligatorio'),
    password: Yup.string().required('* Este campo es obligatorio'),
    subsidiary: Yup.object().nullable().required('* Este campo es obligatorio')
  })

  const initialValues = {
    username: '',
    password: '',
    subsidiary: { id: '', label: '' }
  }

  const formatedSubsidiaries = organization?.subsidiaries?.map((subsidiary) => ({
    id: subsidiary._id,
    label: subsidiary.name
  })) ?? [{ id: '', label: '' }]

  return (
    <Box sx={{ mt: 3 }}>
      <Button variant='text' onClick={onBackToOrganization}>
        {'< Volver a organización'}
      </Button>
      <Box display='flex' flexDirection='column' alignItems='center' sx={{ mb: 3 }} >
        <img width={150} src={organization?.logo} />
        <Typography variant='h4'>
          {organization?.fullName}
        </Typography>
        <Typography variant='body1'>
          Inicia sesión para continuar
        </Typography>
      </Box>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => { onSubmitLogin({ username: values.username, password: values.password, subsidiary: values?.subsidiary?.id }) }}
        validationSchema={validationSchema}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              <Stack spacing={2}>

                <Select
                  label='Sucursales'
                  placeholder='Selecciona una sucursal'
                  name='subsidiary'
                  options={formatedSubsidiaries}
                  onChange={(
                    event: React.SyntheticEvent<Element, Event>,
                    value: Option | null
                  ) => {
                    setFieldValue('subsidiary', value)
                  }}
                />

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

                {!isValidLogin &&
                  <Typography variant="body2" color="error" mt='0 !important'>
                    * No pertenece a esta sucursal o su usuario/contraseña son incorrectos
                  </Typography>
                }

                <Button
                  disabled={loadingLogin} fullWidth type='submit' variant='contained'
                  endIcon={loadingLogin ? <CircularProgress size={10} /> : null }
                >
                  {loadingLogin ? 'Ingresando' : 'Ingresar'}
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
