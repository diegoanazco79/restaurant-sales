import { Container, Grid } from '@mui/material'

import OrderCard from './components/orderCard'

const SalesPage = () => {
  return (
    <Container maxWidth='xl'>
      <Grid container spacing={3}>
        {[1, 2, 3, 4, 5].map((idx, order) => (
          <Grid key={idx} item xs={12} sm={6} md={3}>
            <OrderCard/>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default SalesPage
