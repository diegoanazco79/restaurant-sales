import { InputAdornment, TextField } from '@mui/material'

import SearchIcon from '@mui/icons-material/Search'

import styles from './styles'

const SearchInput = () => {
  return (
    <TextField
      fullWidth
      sx={styles.mainInput}
      InputLabelProps={{ shrink: true }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize='small' />
          </InputAdornment>
        )
      }}
      placeholder='Escribe para buscar...'
    />
  )
}

export default SearchInput
