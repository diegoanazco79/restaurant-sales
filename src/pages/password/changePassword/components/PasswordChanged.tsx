import { Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const PasswordChanged = () => {
  const navigate = useNavigate()

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Cambio de contraseña exitoso
      </Typography>
      <Typography variant="body2" gutterBottom>
        Ahora puedes ingresar a tu cuenta con tu usuario y contraseña a la
        sucursal de tu organización.
      </Typography>
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 4 }}
        onClick={() => {
          navigate('/login')
        }}
      >
        Iniciar sesión
      </Button>
    </>
  )
}

export default PasswordChanged
