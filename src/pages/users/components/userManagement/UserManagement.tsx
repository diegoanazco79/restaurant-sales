import { Box, Button } from '@mui/material'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'

import Input from 'components/form/Input'
import RadioGroupField from 'components/form/RadioGroup'
import SwitchField from 'components/form/Switch'

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
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  onFinishModal: (user: User, setShow: React.Dispatch<React.SetStateAction<boolean>>) => void
}

const UserManagement = ({
  actionType, currentUser,
  setShow,
  onFinishModal
}: Props) => {
  const [currentStatus, setCurrentStatus] = useState(currentUser?.status === 'active')

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
    role: currentUser?.role?.id ?? ''
  }

  const handleSubmit = (values: FormValues) => {
    const findRole = roleOptions.find(role => role.value === values.role)
    const newRole = {
      id: findRole?.value ?? '',
      name: findRole?.label ?? ''
    }

    const newUser = {
      id: currentUser?.id ?? '',
      username: values.username,
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      role: newRole ?? roleOptions[0],
      status: currentStatus ? 'active' : 'inactive'
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
          <Input
            className={{ mb: 2 }}
            label="Username"
            name="username"
            placeholder="Escribe aquí el username"
          />

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

          {actionType === 'edit' && (
            <SwitchField
              title='Estado'
              label='Inactivo'
              rightLabel='Activo'
              name='status'
              checked={currentStatus}
              onChange={(ev) => { setCurrentStatus(ev.target.checked) } }
            />
          )}

          <Box display="flex" justifyContent="space-between" pt={4}>
            <Button
              variant="contained" color="inherit"
              onClick={() => { setShow(false) }}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {actionType === 'create' ? 'Invitar' : 'Editar'}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  )
}

export default UserManagement
