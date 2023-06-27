import { Box, Button } from '@mui/material'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'

import Input from 'components/form/Input'
import RadioGroupField from 'components/form/RadioGroup'

import { type Client } from '../interfaces/Clients'
import { typeDocumentOptions } from '../helpers/constants'

interface FormValues {
  name: string
  typeDocument: string
  document: string
  phone: string
  email: string
}

interface Props {
  actionType: string
  currentClient?: Client
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  onFinishModal: (client: Client) => void
}

const ClientManagement = ({ actionType, currentClient, setShow, onFinishModal }: Props) => {
  const validationSchema = Yup.object({
    name: Yup.string().required('* Este campo es obligatorio'),
    typeDocument: Yup.string().required('* Este campo es requerido'),
    document: Yup.string().required('* Este campo es obligatorio'),
    email: Yup.string().email('* Debe ser un correo electrónico válido')
  })

  const initialValues = {
    name: currentClient?.name ?? '',
    typeDocument: currentClient?.typeDocument ?? '',
    document: currentClient?.document ?? '',
    phone: currentClient?.phone ?? '',
    email: currentClient?.email ?? ''
  }

  const handleSubmit = (values: FormValues) => {
    const newClient = {
      _id: currentClient?._id ?? '',
      name: values.name ?? '',
      typeDocument: values.typeDocument ?? '',
      document: values.document ?? '',
      phone: values.phone ?? '',
      email: values?.email ?? '',
      subsidiary: currentClient?.subsidiary ?? '',
      organization: currentClient?.organization ?? ''
    }
    onFinishModal(newClient)
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
            label="Nombres y Apellidos / Razón Social"
            name="name"
            placeholder="Escribe aquí el nombre completo o razón social"
          />

          <RadioGroupField
            label="Tipo de Documento"
            name="typeDocument"
            options={typeDocumentOptions}
          />

          <Input
            className={{ mb: 2, mt: 1 }}
            label="Documento"
            name="document"
            placeholder="Escribe aquí el documento"
          />

          <Input
            className={{ mb: 2 }}
            label="Número de Celular (opcional)"
            name="phone"
            placeholder="Escribe aquí el número de celular"
          />

          <Input
            className={{ mb: 2 }}
            label="Correo Electrónico (opcional)"
            name="email"
            placeholder="Escribe aquí el correo electrónico"
          />

          <Box display="flex" justifyContent="space-between" pt={4}>
            <Button
              variant="contained" color="inherit"
              onClick={() => { setShow(false) }}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {actionType === 'create' ? 'Añadir' : 'Editar'}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  )
}

export default ClientManagement
