import { Button, CircularProgress, Stack, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'

import Input from 'components/form/Input'

interface Props {
  isValidOrganization: boolean
  loadingOrganization: boolean
  onCheckOrganization: (organizationName: string) => void
}

const OrganizationForm = ({
  isValidOrganization, loadingOrganization,
  onCheckOrganization
}: Props) => {
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
                {!isValidOrganization &&
                  <Typography variant="body2" color="error" mt='0 !important'>
                    * La organización no existe o se encuentra inactiva
                  </Typography>
                }
                <Button
                  disabled={loadingOrganization} fullWidth type='submit' variant='contained'
                  endIcon={loadingOrganization ? <CircularProgress size={10} /> : null }
                >
                  {loadingOrganization ? 'Ingresando...' : 'Ingresar'}
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
