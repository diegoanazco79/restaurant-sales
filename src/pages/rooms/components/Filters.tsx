import { Box, Grid } from '@mui/material'

import SearchInput from 'components/searchInput'

interface Props {
  onSearchRoom: (search: string) => void
}

const Filters = ({ onSearchRoom }: Props) => {
  return (
    <Box mb={2}>
      <Grid container spacing={2}>
        <Grid item md={3}>
          <SearchInput
            placeholder="Escribe para buscar un ambiente"
            onChange={onSearchRoom}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Filters
