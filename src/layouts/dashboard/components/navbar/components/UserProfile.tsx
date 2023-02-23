import { Avatar, Box, Typography } from '@mui/material'
import { styled, alpha } from '@mui/material/styles'

import { useAuthStore } from 'store/auth'

const UserProfile = () => {
  const profile = useAuthStore((state) => state.profile)
  const roles = useAuthStore((state) => state.roles)

  const StyledAccount = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    backgroundColor: alpha(theme.palette.grey[500], 0.12)
  }))

  return (
    <Box sx={{ my: 5, mx: 2.5 }}>
      <StyledAccount>
        <Avatar src='https://minimal-kit-react.vercel.app/assets/images/avatars/avatar_default.jpg' alt="photoURL" />
        <Box sx={{ ml: 2 }}>
          <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
            {profile?.name}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {roles?.at(0)?.name}
          </Typography>
        </Box>
      </StyledAccount>
    </Box>
  )
}

export default UserProfile
