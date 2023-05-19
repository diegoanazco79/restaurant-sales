import { Box, Button, CircularProgress, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'

import Input from 'components/form/Input'
import RadioGroupField from 'components/form/RadioGroup'

import { type User } from 'pages/users/interfaces/User'
import { roleOptions } from 'pages/users/helpers/constants'

interface FormValues {
  username: string
  email: string
  firstName: string
  lastName: string
  role: string
}

interface Props {
  actionType: string
  currentUser?: User
  loadingRequest: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  onFinishModal: (user: User, setShow: React.Dispatch<React.SetStateAction<boolean>>) => void
}

const UserManagement = ({
  actionType, currentUser, loadingRequest,
  setShow,
  onFinishModal
}: Props) => {
  const validationSchema = Yup.object({
    username: Yup.string().required('* Este campo es obligatorio'),
    email: Yup.string().required('* Este campo es obligatorio').email('* Debe ser un correo electrónico válido'),
    firstName: Yup.string().required('* Este campo es obligatorio'),
    lastName: Yup.string().required('* Este campo es obligatorio'),
    role: Yup.string().required('Este campo es requerido')
  })

  const initialValues = {
    username: currentUser?.username ?? '',
    email: currentUser?.email ?? '',
    firstName: currentUser?.firstName ?? '',
    lastName: currentUser?.lastName ?? '',
    role: currentUser?.role?._id ?? ''
  }

  const handleSubmit = (values: FormValues) => {
    const findRole = roleOptions.find(role => role.value === values.role)
    const newRole = {
      _id: findRole?.value ?? '',
      name: findRole?.label ?? ''
    }

    const newUser = {
      _id: currentUser?._id ?? '',
      username: actionType === 'create' ? values.username : currentUser?.username ?? '',
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      status: currentUser?.status,
      role: newRole ?? roleOptions[0]
    }
    onFinishModal(newUser, setShow)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => { handleSubmit(values) }}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          {actionType === 'create'
            ? (
              <Input
                className={{ mb: 2 }}
                label="Username"
                name="username"
                placeholder="Escribe aquí el username"
              />
            )
            : (
              <>
                <Typography variant='body2' fontWeight={600}>Username</Typography>
                <Typography variant='body2' mb={2}>{currentUser?.username}</Typography>
              </>
            )}

          <Input
            className={{ mb: 2 }}
            label="Correo Electrónico"
            name="email"
            placeholder="Escribe aquí el correo electrónico"
          />

          <Input
            className={{ mb: 2 }}
            label="Nombres"
            name="firstName"
            placeholder="Escribe aquí el nombre del usuario"
          />

          <Input
            className={{ mb: 2 }}
            label="Apellidos"
            name="lastName"
            placeholder="Escribe aquí el apellido del usuario"
          />

          <RadioGroupField
            name="role"
            label="Rol"
            options={roleOptions}
          />

          <Box display="flex" justifyContent="space-between" pt={4}>
            <Button
              variant="contained" color="inherit"
              disabled={loadingRequest}
              onClick={() => { setShow(false) }}
            >
              Cancelar
            </Button>
            <Button
              type="submit" variant="contained" color="primary"
              disabled={loadingRequest}
              endIcon={loadingRequest ? <CircularProgress size={10} /> : null }
            >
              {actionType === 'create'
                ? loadingRequest ? 'Enviando invitación' : 'Invitar'
                : loadingRequest ? 'Editando' : 'Editar'
              }
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  )
}

export default UserManagement
