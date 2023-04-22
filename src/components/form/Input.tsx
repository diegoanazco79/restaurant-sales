import { ErrorMessage, useField } from 'formik'
import { Typography, TextField, Box, type SxProps, type Theme, useTheme, InputAdornment } from '@mui/material'

import { pxToRem } from 'theme/helpers/functions'

interface Props {
  label?: string
  name: string
  className?: SxProps<Theme>
  inputLabelAdorment?: string
  type?: 'text' | 'email' | 'password' | 'number'
  placeholder?: string
  [x: string]: any
}

const Input = ({ label, className, inputLabelAdorment, ...props }: Props) => {
  const [field] = useField(props)
  const theme = useTheme()

  return (
    <Box sx={{ span: { color: theme.palette.error.dark }, ...className }}>
      <Typography variant="body2" fontWeight={600} mb={pxToRem(4)}>
        {label}
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        InputLabelProps={{
          shrink: true
        }}
        InputProps={inputLabelAdorment
          ? {
            startAdornment: <InputAdornment position="start">{inputLabelAdorment} </InputAdornment>
          }
          : undefined}
        {...props}
        {...field}
      />
      <ErrorMessage
        className='formik-error'
        name={props.name}
        component='span'
      />
    </Box>
  )
}

export default Input
