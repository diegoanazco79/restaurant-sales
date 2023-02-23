import { Card, Container, Typography, useMediaQuery, useTheme } from '@mui/material'

import LoginForm from './components/LoginForm'
import OrganizationForm from './components/OrganizationForm'
import StyledContent from './components/Content'
import StyledRoot from './components/Root'
import StyledSection from './components/Section'

import useLogin from './hooks/useLogin'

const LoginPage = () => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  const {
    showPassword, currentOrganization: organization,
    handleClickShowPassword, handleMouseDownPassword,
    onSubmitLogin, onCheckOrganization, onBackToOrganization
  } = useLogin()

  /* Component's Props */
  const loginFormProps = {
    showPassword,
    organization,
    handleClickShowPassword,
    handleMouseDownPassword,
    onSubmitLogin,
    onBackToOrganization
  }

  return (
    <StyledRoot>
      {isDesktop && (
        <StyledSection>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Hola, ¡Bienvenido!
          </Typography>
          <img src="https://minimal-kit-react.vercel.app/assets/illustrations/illustration_login.png" alt="login" />
        </StyledSection>
      )}

      <Container maxWidth="sm">
        <StyledContent>
          <Card sx={{ p: 2 }}>
            {(organization === null) && <OrganizationForm onCheckOrganization={onCheckOrganization} />}
            {(organization !== null) && <LoginForm {...loginFormProps} />}
          </Card>
        </StyledContent>
      </Container>
    </StyledRoot>
  )
}

export default LoginPage
