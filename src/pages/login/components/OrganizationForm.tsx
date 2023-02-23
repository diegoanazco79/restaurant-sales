import { Button, Stack, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'

import Input from 'components/form/Input'

interface Props {
  onCheckOrganization: (organizationName: string) => void
}

const OrganizationForm = ({ onCheckOrganization }: Props) => {
  const validationSchema = Yup.object({
    organization: Yup.string().required('* Este campo es obligatorio')
  })

  const initialValues = {
    organization: ''
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Organización
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => { onCheckOrganization(values.organization) } }
        validationSchema={validationSchema}
      >
        {() => {
          return (
            <Form>
              <Stack spacing={2}>
                <Input
                  label='Ingresa el nombre de tu organización'
                  name="organization"
                  placeholder="Ingresa tu organización"
                />
                <Button fullWidth type='submit' variant='contained'>
                  Ingresar
                </Button>
              </Stack>
            </Form>
          )
        }}
      </Formik>
    </>
  )
}

export default OrganizationForm
