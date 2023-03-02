import { Box, IconButton, Typography } from '@mui/material'

import MoreVertIcon from '@mui/icons-material/MoreVert'

interface Props {
  orderName: string
  handleOpen: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const OrderHeader = ({ orderName, handleOpen }: Props) => {
  return (
    <Box display='flex' alignItems='center' justifyContent='space-between'>
      <Typography variant='h6'>{orderName}</Typography>
      <IconButton onClick={handleOpen} sx={{ p: 0 }} >
        <MoreVertIcon fontSize="small" />
      </IconButton>
    </Box>
  )
}

export default OrderHeader
