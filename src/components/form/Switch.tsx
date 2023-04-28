import { useField } from 'formik'
import { Switch, FormControlLabel, Typography } from '@mui/material'

interface Props {
  title?: string
  label: string
  rightLabel?: string
  name: string
  checked: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const SwitchField = ({
  title, label = '', rightLabel = '',
  name, checked, onChange
}: Props) => {
  const [field] = useField({ name, type: 'checkbox' })

  return (
    <>
      {title && (
        <Typography variant="body2" fontWeight={600} mt={2}>
          {title}
        </Typography>
      )}
      <FormControlLabel
        label={
          <Typography variant="body2" component="span">
            {label}
          </Typography>
        }
        control={
          <Switch
            {...field}
            checked={checked}
            onChange={onChange}
            size="small"
          />
        }
        labelPlacement="start"
        sx={{ ml: 0 }}
      />
      {rightLabel && (
        <Typography variant="body2" component="span" ml={2}>
          {rightLabel}
        </Typography>
      )}
    </>
  )
}

export default SwitchField
