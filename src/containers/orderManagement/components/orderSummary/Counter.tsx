import { Box, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material'

import { type ProductType } from 'pages/products/interfaces/Products'

import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined'

interface Props {
  id: string
  amount: number
  type: ProductType
  handleIncrement: (id: string, type: ProductType['_id']) => void
  handleDecrement: (id: string, type: ProductType['_id']) => void
}

const Counter = ({
  id, amount, type,
  handleIncrement, handleDecrement
}: Props) => {
  const theme = useTheme()
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md'))

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
        onClick={() => { handleDecrement(id, type?._id) }}
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
        onClick={() => { handleIncrement(id, type?._id) }}
      >
        <AddOutlinedIcon sx={{ fontSize: '18px' }}/>
      </IconButton>
    </Box>
  )
}

export default Counter
