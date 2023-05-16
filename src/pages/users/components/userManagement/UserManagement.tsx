import { Box, Button, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'

import Input from 'components/form/Input'
import RadioGroupField from 'components/form/RadioGroup'
import SwitchField from 'components/form/Switch'

import { type User } from 'pages/users/interfaces/User'
import { roleOptions } from 'pages/users/helpers/constants'

interface FormValues {
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
    email: Yup.string().required('* Este campo es obligatorio').email('* Debe ser un correo electrónico válido'),
    firstName: Yup.string().required('* Este campo es obligatorio'),
    lastName: Yup.string().required('* Este campo es obligatorio'),
    role: Yup.string().required('Este campo es requerido')
  })

  const initialValues = {
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
      username: currentUser?.username ?? '',
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      status: currentStatus ? 'active' : 'inactive',
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
          <Typography variant='body2' fontWeight={600}>Username</Typography>
          <Typography variant='body2' mb={2}>{currentUser?.username}</Typography>

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
