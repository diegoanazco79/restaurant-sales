import { Box, Grid, IconButton } from '@mui/material'

import SearchInput from 'components/searchInput'

import TuneIcon from '@mui/icons-material/Tune'

interface Props {
  roomType: string
}

const Filters = ({ roomType }: Props) => {
  return (
    <Box marginY={2}>
      <Grid container>
        <Grid item sm={6} md={3}>
          <SearchInput />
        </Grid>
        <Grid item sm={6} md={9} paddingLeft={2}>
          <IconButton>
            <TuneIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Filters
