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
}

interface Props {
  actionType: string
  currentClient?: Client
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  onFinishModal: (client: Client, setShow: React.Dispatch<React.SetStateAction<boolean>>) => void
}

const ClientManagement = ({ actionType, currentClient, setShow, onFinishModal }: Props) => {
  const validationSchema = Yup.object({
    name: Yup.string().required('* Este campo es obligatorio'),
    typeDocument: Yup.string().required('Este campo es requerido'),
    document: Yup.string().required('* Este campo es obligatorio'),
    phone: Yup.string().required('* Este campo es obligatorio')
  })

  const initialValues = {
    name: currentClient?.name ?? '',
    typeDocument: currentClient?.typeDocument ?? '',
    document: currentClient?.document ?? '',
    phone: currentClient?.phone ?? ''
  }

  const handleSubmit = (values: FormValues) => {
    const newClient = {
      id: currentClient?.id ?? '',
      name: values.name ?? '',
      typeDocument: values.typeDocument ?? '',
      document: values.document ?? '',
      phone: values.phone ?? ''
    }
    onFinishModal(newClient, setShow)
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
            label="Nombre / Razón Social"
            name="name"
            placeholder="Escribe aquí el nombre o razón social"
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
            label="Número de Celular"
            name="phone"
            placeholder="Escribe aquí el número de celular"
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
