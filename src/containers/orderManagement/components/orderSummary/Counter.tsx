import { Box, IconButton, Typography, useTheme } from '@mui/material'

import useResponsive from 'helpers/hooks/useResponsive'

import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined'

interface Props {
  counter: number
  price: number
  setCounter: React.Dispatch<React.SetStateAction<number>>
}

const Counter = ({ counter, price, setCounter }: Props) => {
  const theme = useTheme()
  const { isMobileOrTablet } = useResponsive()

  const handleDecrease = () => {
    if (counter > 1) {
      setCounter(counter - 1)
    }
  }

  const handleIncrease = () => {
    setCounter(counter + 1)
  }

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
        onClick={handleDecrease}
      >
        <RemoveOutlinedIcon sx={{ fontSize: '18px' }}/>
      </IconButton>
      <Typography
        marginX={isMobileOrTablet ? 1 : 2}
        variant="body2"
        fontWeight={600}
      >
        {counter}
      </Typography>
      <IconButton
        size='small'
        sx={{
          background: theme.palette.grey[300],
          '&:hover': {
            background: theme.palette.grey[400]
          }
        }}
        onClick={handleIncrease}
      >
        <AddOutlinedIcon sx={{ fontSize: '18px' }}/>
      </IconButton>
    </Box>
  )
}

export default Counter
