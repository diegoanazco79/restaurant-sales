import { type FC } from 'react'
import { ErrorMessage, useField } from 'formik'
import { type FieldValidator } from 'formik/dist/types'
import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'

import { pxToRem } from 'theme/helpers/functions'

interface RadioGroupProps {
  name: string
  label: string
  options: Array<{ value: string, label: string }>
  validate?: FieldValidator
}

const RadioGroupField: FC<RadioGroupProps> = ({ name, label, options, validate }) => {
  const [field, meta] = useField({ name, validate })

  return (
    <FormControl component="fieldset" error={meta.touched && !!meta.error}>
      <Typography variant="body2" fontWeight={600} mb={pxToRem(4)}>
        {label}
      </Typography>
      <RadioGroup {...field} aria-label={name} row>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={
              <Radio
                sx={{
                  '& .MuiSvgIcon-root': {
                    fontSize: pxToRem(20)
                  }
                }}
              />
            }
            label={<Typography variant="body2">{option.label}</Typography>}
          />
        ))}
      </RadioGroup>
      <ErrorMessage className="formik-error" name={name} component="span" />
    </FormControl>
  )
}

export default RadioGroupField
