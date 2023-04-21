import { Box, Button, Grid } from '@mui/material'

import Dropdown from 'components/dropdown'
import SearchInput from 'components/searchInput'

const Filters = () => {
  return (
    <Box mb={2}>
      <Grid container spacing={2}>
        <Grid item md={3}>
          <SearchInput placeholder='Escribe para buscar un producto'/>
        </Grid>
        <Grid item md={3} textAlign='start'>
          <Dropdown
            buttonLabel='Filtrar por categoría'
            sx={{ marginRight: 2 }}
            selected={false}
            options={[
              { label: 'Picantería', onClick: () => { console.log('Filtro') } },
              { label: 'Especiales', onClick: () => { console.log('Filtro') } },
              { label: 'Bebidas', onClick: () => { console.log('Filtro') } },
              { label: 'Postres', onClick: () => { console.log('Filtro') } }
            ]}
          />
        </Grid>
        <Grid item md={6} textAlign='end'>
          <Button variant='contained' color='primary'>
            Añadir producto
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Filters
