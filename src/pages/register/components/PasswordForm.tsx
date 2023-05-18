import * as Yup from 'yup'
import { useState } from 'react'
import { Form, Formik } from 'formik'
import { useParams } from 'react-router-dom'
import { Button, CircularProgress, IconButton, InputAdornment, Stack, Typography } from '@mui/material'

import Input from 'components/form/Input'

import { type UseMutateFunction } from '@tanstack/react-query'
import { type RegisterUser } from 'api/interfaces/UsersApi'

import { Visibility, VisibilityOff } from '@mui/icons-material'

interface Props {
  loadingRegister: boolean
  onRegisterUser: UseMutateFunction<any, unknown, RegisterUser, unknown>
}

const PasswordForm = ({ loadingRegister, onRegisterUser }: Props) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const params = useParams()
  const token = params.token ?? ''

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .required('La contraseña es requerida'),
    confirmPassword: Yup.string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .test('passwords-match', 'Las contraseñas no coinciden', function (value) {
        return this.parent.password === value
      })
  })

  const initialValues = {
    password: '',
    confirmPassword: ''
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Completa tu registro
      </Typography>
      <Typography variant="body2" gutterBottom>
        Por favor ingresa tu contraseña para completar tu registro
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          onRegisterUser({
            password: values.password,
            token,
            status: 'active'
          })
        } }
        validationSchema={validationSchema}
      >
        {() => {
          return (
            <Form>
              <Stack spacing={2}>
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
                          onClick={() => { setShowPassword(!showPassword) }}
                          onMouseDown={(event) => { event.preventDefault() }}
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

                <Input
                  label="Repite tu contraseña"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Ingresa tu contraseña una vez más"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => { setShowConfirmPassword(!showConfirmPassword) }}
                          onMouseDown={(event) => { event.preventDefault() }}
                          edge="end"
                        >
                          {showConfirmPassword
                            ? <VisibilityOff fontSize='small' />
                            : <Visibility fontSize='small' />
                          }
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />

                <Button
                  disabled={loadingRegister} fullWidth type='submit' variant='contained'
                  endIcon={loadingRegister ? <CircularProgress size={10} /> : null }
                >
                  {loadingRegister ? 'Completando registro...' : 'Completar registro'}
                </Button>
              </Stack>
            </Form>
          )
        }}
      </Formik>
    </>
  )
}

export default PasswordForm
