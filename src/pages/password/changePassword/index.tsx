import { Card, Container, Typography, useMediaQuery, useTheme } from '@mui/material'

import PasswordChanged from './components/PasswordChanged'
import PasswordForm from './components/PasswordForm'
import StyledContent from './components/Content'
import StyledRoot from './components/Root'
import StyledSection from './components/Section'

import useChangePassword from './hooks/useChangePassword'

const ChangePasswordPage = () => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  const {
    validForm, errorChangePassword, loadingChangePassword,
    onChangePassword
  } = useChangePassword()

  /* Component's Props */
  const passwordFormProps = { errorChangePassword, loadingChangePassword, onChangePassword }

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
            {validForm
              ? <PasswordChanged />
              : <PasswordForm {...passwordFormProps}/>
            }
          </Card>
        </StyledContent>
      </Container>
    </StyledRoot>
  )
}

export default ChangePasswordPage
