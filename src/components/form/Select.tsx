import { type SyntheticEvent } from 'react'
import { ErrorMessage } from 'formik'
import { Autocomplete, Box, type SxProps, TextField, type Theme, Typography, useTheme } from '@mui/material'

import { pxToRem } from 'theme/helpers/functions'

export interface Option {
  id: string
  label: string
}

interface Props {
  label: string
  name: string
  placeholder: string
  options: Option[]
  value?: Option | null
  defaultValue?: Option | null
  className?: SxProps<Theme>
  onChange: (ev: SyntheticEvent<Element, Event>, value: Option | null) => void
  [x: string]: any
}

const Select = ({
  label, options, className, value, defaultValue, placeholder,
  onChange, ...props
}: Props) => {
  const theme = useTheme()

  return (
    <Box sx={{ span: { color: theme.palette.error.dark }, ...className }}>
      <Typography variant="body2" fontWeight={600} marginBottom={pxToRem(4)}>
        {label}
      </Typography>
      <Autocomplete
        sx={{
          '& .MuiOutlinedInput-input': {
            p: '0 !important'
          }
        }}
        autoComplete
        includeInputInList
        noOptionsText='Sin opciones'
        value={value === null ? defaultValue : value}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        options={options}
        onChange={onChange}
        getOptionLabel= {(option) => option.label }
        renderInput={(params) => (
          <TextField {...params}
            InputLabelProps={{
              shrink: true
            }}
            placeholder={placeholder}
            variant="outlined"
            {...props}
          />
        )}
      />
      <ErrorMessage
        className='formik-error'
        name={props.name}
        component='span'
      />
    </Box>
  )
}

export default Select
