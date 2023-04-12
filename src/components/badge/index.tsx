import { Chip, Typography } from '@mui/material'

interface Props {
  label: string
  type?: 'success' | 'error' | 'default' | 'warning'
}

const Badge = ({ label, type = 'default' }: Props) => {
  return (
    <Chip
      label={
        <Typography
          variant='caption'
          fontWeight={600}
        >
          {label}
        </Typography>
      }
      color={type}
    />
  )
}

export default Badge
