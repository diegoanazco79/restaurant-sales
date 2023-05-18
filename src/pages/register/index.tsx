import { Card, Container, Typography, useMediaQuery, useTheme } from '@mui/material'

import PasswordForm from './components/PasswordForm'
import RegisterComplete from './components/RegisterComplete'
import StyledContent from './components/Content'
import StyledRoot from './components/Root'
import StyledSection from './components/Section'

import useRegister from './hooks/useRegister'

const RegisterPapge = () => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  const { validRegister, loadingRegister, onRegisterUser } = useRegister()

  /* Component's Props */
  const passwordFormProps = { loadingRegister, onRegisterUser }

  return (
    <StyledRoot>
      {isDesktop && (
        <StyledSection>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            ¡Completa tu registro!
          </Typography>
          <img src="https://minimal-kit-react.vercel.app/assets/illustrations/illustration_login.png" alt="login" />
        </StyledSection>
      )}

      <Container maxWidth="sm">
        <StyledContent>
          <Card sx={{ p: 2 }}>
            {validRegister
              ? <RegisterComplete />
              : <PasswordForm {...passwordFormProps} />
            }
          </Card>
        </StyledContent>
      </Container>
    </StyledRoot>
  )
}

export default RegisterPapge
