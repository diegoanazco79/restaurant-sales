import { Box, IconButton, Typography, useTheme } from '@mui/material'

import useResponsive from 'helpers/hooks/useResponsive'

import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined'

interface Props {
  id: string
  amount: number
  handleIncrement: (id: string) => void
  handleDecrement: (id: string) => void
}

const Counter = ({ id, amount, handleIncrement, handleDecrement }: Props) => {
  const theme = useTheme()
  const { isMobileOrTablet } = useResponsive()

  return (
    <Box display="flex" alignItems="center">
      <IconButton
        size='small'
        sx={{
          background: theme.palette.grey[300],
          '&:hover': {
            background: theme.palette.grey[400]
          }
        }}
        onClick={() => { handleDecrement(id) }}
      >
        <RemoveOutlinedIcon sx={{ fontSize: '18px' }}/>
      </IconButton>
      <Typography
        marginX={isMobileOrTablet ? 1 : 2}
        variant="body2"
        fontWeight={600}
      >
        {amount}
      </Typography>
      <IconButton
        size='small'
        sx={{
          background: theme.palette.grey[300],
          '&:hover': {
            background: theme.palette.grey[400]
          }
        }}
        onClick={() => { handleIncrement(id) }}
      >
        <AddOutlinedIcon sx={{ fontSize: '18px' }}/>
      </IconButton>
    </Box>
  )
}

export default Counter
