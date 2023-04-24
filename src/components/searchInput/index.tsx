import { debounce } from 'lodash'
import { InputAdornment, type SxProps, TextField, type Theme } from '@mui/material'

import SearchIcon from '@mui/icons-material/Search'

interface Props {
  sx?: SxProps<Theme>
  placeholder: string
  onChange: (name: string) => void
}

const SearchInput = ({ sx, placeholder, onChange }: Props) => {
  const handleOnChangeDebounced = debounce((value: string) => {
    onChange(value)
  }, 700)

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    handleOnChangeDebounced(value)
  }

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
      onChange={handleOnChange}
    />
  )
}

export default SearchInput
