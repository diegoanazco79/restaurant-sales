import { InputAdornment, type SxProps, TextField, type Theme } from '@mui/material'

import SearchIcon from '@mui/icons-material/Search'

interface Props {
  sx?: SxProps<Theme>
  placeholder: string
}

const SearchInput = ({ sx, placeholder }: Props) => {
  return (
    <TextField
      fullWidth
      sx={{ ...sx }}
      InputLabelProps={{ shrink: true }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize='small' />
          </InputAdornment>
        )
      }}
      placeholder={placeholder}
    />
  )
}

export default SearchInput
