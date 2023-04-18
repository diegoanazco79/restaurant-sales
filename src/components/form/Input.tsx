import { ErrorMessage, useField } from 'formik'
import { Typography, TextField, Box, type SxProps, type Theme, useTheme } from '@mui/material'

import { pxToRem } from 'theme/helpers/functions'

interface Props {
  label?: string
  name: string
  className?: SxProps<Theme>
  type?: 'text' | 'email' | 'password'
  placeholder?: string
  [x: string]: any
}

const Input = ({ label, className, ...props }: Props) => {
  const [field] = useField(props)
  const theme = useTheme()

  return (
    <Box sx={{ span: { color: theme.palette.error.dark }, ...className }}>
      <Typography variant="body2" fontWeight={600} marginBottom={pxToRem(4)}>
        {label}
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        InputLabelProps={{
          shrink: true
        }}
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
