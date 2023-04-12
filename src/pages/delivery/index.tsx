import { Container, Grid } from '@mui/material'

import TitlePage from 'components/titlePage'
import AddDelivery from './components/AddDelivery'

const DeliveryPage = () => {
  return (
    <Container maxWidth='xl' sx={{ height: '100%' }}>
      <TitlePage title='Delivery'/>
      <Grid container spacing={3} pb={10}>
        <Grid item xs={12} sm={6} md={3}>
          <AddDelivery />
        </Grid>
      </Grid>
    </Container>
  )
}

export default DeliveryPage
