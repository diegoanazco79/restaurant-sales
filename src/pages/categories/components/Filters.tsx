import { Box, Grid } from '@mui/material'

import SearchInput from 'components/searchInput'

interface Props {
  onSearchCategory: (search: string) => void
}

const Filters = ({ onSearchCategory }: Props) => {
  return (
    <Box mb={2}>
      <Grid container spacing={2}>
        <Grid item md={3}>
          <SearchInput
            placeholder="Escribe para buscar una categoría"
            onChange={onSearchCategory}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Filters
