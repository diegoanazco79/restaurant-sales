import { Form, Formik } from 'formik'
import * as Yup from 'yup'

import Input from 'components/form/Input'
import Select, { type Option } from 'components/form/Select'
import { Box, Button, Stack } from '@mui/material'
import { paymentTypes } from 'containers/orderManagement/mock/paymentTypes'
import { providersMock } from 'containers/orderManagement/mock/providersMock'

interface FormValues {
  client: string
  address: string
  cellPhone: string
  paymentType: Option | null
  provider: Option | null
}

type SetSubmitting = (isSubmitting: boolean) => void
type ResetForm = () => void

interface Props {
  setShowDeliveryDetails: (showDeliveryDetails: boolean) => void
}

const DetailModal = ({ setShowDeliveryDetails }: Props) => {
  const validationSchema = Yup.object({
    client: Yup.string().required('* Este campo es obligatorio'),
    address: Yup.string().required('* Este campo es obligatorio'),
    cellPhone: Yup.string().required('* Este campo es obligatorio'),
    paymentType: Yup.object()
      .nullable()
      .required('* Este campo es obligatorio'),
    provider: Yup.object().nullable().required('* Este campo es obligatorio')
  })

  const initialValues = {
    client: '',
    address: '',
    cellPhone: '',
    paymentType: null,
    provider: null
  }

  const handleAddDelivery = (
    values: FormValues,
    setSubmitting: SetSubmitting,
    resetForm: ResetForm
  ) => {
    setSubmitting(false)
    resetForm()
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        handleAddDelivery(values, setSubmitting, resetForm)
      }}
    >
      {({ values, handleSubmit, setFieldValue }) => (
        <Form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Input
              label="Nombre del cliente"
              name="client"
              placeholder="Escribe aquí el nombre de tu cliente"
            />
            <Input
              label="Dirección del cliente"
              name="address"
              placeholder="Escribe aquí la dirección de tu cliente"
            />
            <Input
              label="Celular del cliente"
              name="cellPhone"
              placeholder="Escribe aquí el celular de tu cliente"
            />
            <Select
              label="Método de pago"
              placeholder="Busque o seleccione el método de pago"
              name="paymentType"
              options={paymentTypes}
              onChange={(
                event: React.SyntheticEvent<Element, Event>,
                value: Option | null
              ) => {
                setFieldValue('paymentType', value)
              }}
              value={values.paymentType}
            />
            <Select
              label="Proveedor"
              placeholder="Busque o seleccione el proveedor"
              name="provider"
              options={providersMock}
              onChange={(
                event: React.SyntheticEvent<Element, Event>,
                value: Option | null
              ) => {
                setFieldValue('provider', value)
              }}
              value={values.provider}
            />

            <Box display="flex" justifyContent="space-between">
              <Button
                variant="contained"
                color="inherit"
                onClick={() => {
                  setShowDeliveryDetails(false)
                }}
              >
                Cancelar
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Añadir delivery
              </Button>
            </Box>
          </Stack>
        </Form>
      )}
    </Formik>
  )
}

export default DetailModal
