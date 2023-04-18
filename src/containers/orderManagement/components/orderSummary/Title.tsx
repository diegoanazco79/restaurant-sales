import { Box, Typography } from '@mui/material'

import ListAltIcon from '@mui/icons-material/ListAlt'

interface Props {
  roomType: string
  orderTitle: string
}

const Title = ({ roomType, orderTitle }: Props) => {
  const isDelivery = roomType === 'delivery'

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <ListAltIcon />
      <Typography variant="body1" marginLeft={1} fontWeight={600}>
        {`Órdenes ${isDelivery ? 'del delivery' : 'de la'} ${
          isDelivery ? '' : orderTitle
        }`}
      </Typography>
    </Box>
  )
}

export default Title
