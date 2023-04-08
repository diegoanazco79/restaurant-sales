import { Box, Typography } from '@mui/material'

import Item from './Item'
import { SummaryLayout } from '../styled/SummaryLayout'

import ListAltIcon from '@mui/icons-material/ListAlt'

const OrderSummary = () => {
  return (
    <SummaryLayout maxWidth="xl">
      <Box display="flex" alignItems="center" justifyContent="center">
        <ListAltIcon />
        <Typography variant="body1" marginLeft={1} fontWeight={600}>
          Platos de la Mesa
        </Typography>
      </Box>
      <Item id="1" name="Coca Cola" price={5} />
    </SummaryLayout>
  )
}

export default OrderSummary
