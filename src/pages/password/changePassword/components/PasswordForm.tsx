import * as Yup from 'yup'
import { useState } from 'react'
import { Form, Formik } from 'formik'
import { useParams } from 'react-router-dom'
import { Button, CircularProgress, IconButton, InputAdornment, Stack, Typography } from '@mui/material'

import Input from 'components/form/Input'

import { type UseMutateFunction } from '@tanstack/react-query'
import { type ChangePassword } from 'api/interfaces/UsersApi'

import { Visibility, VisibilityOff } from '@mui/icons-material'

interface Props {
  loadingChangePassword: boolean
  errorChangePassword: boolean
  onChangePassword: UseMutateFunction<any, unknown, ChangePassword, unknown>
}

const PasswordForm = ({ loadingChangePassword, errorChangePassword, onChangePassword }: Props) => {
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
        Nueva contraseña
      </Typography>
      <Typography variant="body2" gutterBottom>
        Ingresa tu nueva contraseña para poder acceder a tu cuenta.
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          onChangePassword({
            password: values.password,
            token
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

                {errorChangePassword && (
                  <Typography variant="body2" color="error" mt='0 !important'>
                    Ocurrió un error al cambiar la contraseña
                  </Typography>
                )}

                <Button
                  disabled={loadingChangePassword} fullWidth type='submit' variant='contained'
                  endIcon={loadingChangePassword ? <CircularProgress size={10} /> : null }
                >
                  {loadingChangePassword ? 'Cambiando contraseña' : 'Cambiar contraseña'}
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
