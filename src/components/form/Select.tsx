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
  initValue?: Option | undefined
  className?: SxProps<Theme>
  onChange: (ev: SyntheticEvent<Element, Event>, value: Option | null) => void
  [x: string]: any
}

const Select = ({
  label, options, className, initValue, placeholder,
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
        defaultValue={initValue}
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
