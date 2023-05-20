import { Card, Container, Typography, useMediaQuery, useTheme } from '@mui/material'

import EmailForm from './components/EmailForm'
import EmailSend from './components/EmailSend'
import StyledContent from './components/Content'
import StyledRoot from './components/Root'
import StyledSection from './components/Section'

import useForgotPassword from './hooks/useForgotPassword'

const ForgotPasswordPage = () => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  const {
    validEmail, loadingForgotPassword, errorForgotPassword,
    onForgotPassword
  } = useForgotPassword()

  /* Component's Props */
  const emailFormProps = { errorForgotPassword, loadingForgotPassword, onForgotPassword }

  return (
    <StyledRoot>
      {isDesktop && (
        <StyledSection>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }} textAlign='center'>
            ¿Olvidaste tu contraseña?
          </Typography>
          <img
            width={300}
            height={300}
            src="https://cdn-icons-png.flaticon.com/512/3256/3256783.png" alt="login"
          />
        </StyledSection>
      )}

      <Container maxWidth="sm">
        <StyledContent>
          <Card sx={{ p: 2 }}>
            {validEmail
              ? <EmailSend />
              : <EmailForm {...emailFormProps} /> }
          </Card>
        </StyledContent>
      </Container>
    </StyledRoot>
  )
}

export default ForgotPasswordPage
