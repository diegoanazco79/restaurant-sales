import { Typography } from '@mui/material'

import DeliveryCard from './styled/DeliveryCard'

import AddIcon from '@mui/icons-material/Add'

const AddDelivery = () => {
  return (
    <DeliveryCard
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height={'100% !important'}
    >
      <AddIcon sx={{ height: '115px', width: '115px', opacity: '0.3' }} />
      <Typography variant="body1"> Añadir delivery </Typography>
    </DeliveryCard>
  )
}

export default AddDelivery
