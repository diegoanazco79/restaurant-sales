import React from 'react'
import { ErrorMessage, Field, type FieldProps } from 'formik'
import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import { type ObjectSchema } from 'yup'

interface RadioGroupFieldProps {
  name: string
  label: string
  defaultValue?: string
  options: Array<{ value: string, label: string }>
  validationSchema?: ObjectSchema<any>
}

const RadioGroupField: React.FC<RadioGroupFieldProps> = ({
  name, label, options, validationSchema, defaultValue
}) => {
  return (
    <FormControl component="fieldset">
      <Typography variant="body2" fontWeight={600}>
        {label}
      </Typography>
      <Field
        name={name}
        validate={validationSchema?.validateSync}
      >
        {({ field }: FieldProps) => (
          <RadioGroup
            row
            aria-label={name}
            name={name}
            value={field.value}
            defaultValue={defaultValue}
            sx={{ ml: '5px' }}
            onChange={(e) => {
              field.onChange(e)
            }}
          >
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio sx={{
                  '& .MuiSvgIcon-root': {
                    fontSize: 20
                  }
                }} />}
                label={option.label}
                sx={{
                  '& .MuiFormControlLabel-label': {
                    fontSize: '14px'
                  },
                  '& .MuiButtonBase-root': {
                    padding: '5px !important'
                  }
                }}
              />
            ))}
          </RadioGroup>
        )}
      </Field>
      <ErrorMessage
        className='formik-error'
        name={name}
        component='span'
      />
    </FormControl>
  )
}

export default RadioGroupField
