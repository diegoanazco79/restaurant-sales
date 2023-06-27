import { Box, Grid, Button } from '@mui/material'

import SearchInput from 'components/searchInput'

interface Props {
  onSearchClient: (search: string) => void
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>
}

const Filters = ({ onSearchClient, setShowAddModal }: Props) => {
  return (
    <Box mb={2}>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={6} md={4} lg={4}>
          <SearchInput
            placeholder='Escribe para buscar un cliente'
            onChange={onSearchClient}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={8} lg={8} textAlign='end'>
          <Button
            variant='contained' color='primary'
            onClick={() => { setShowAddModal(true) }}
          >
            Añadir cliente
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Filters
