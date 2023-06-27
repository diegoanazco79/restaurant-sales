import { styled } from '@mui/material/styles'
import { Box, useTheme } from '@mui/material'

import { pxToRem } from 'theme/helpers/functions'

const ClientCard = styled(Box)(() => {
  const theme = useTheme()

  return {
    height: pxToRem(200),
    minHeight: pxToRem(200),
    maxHeight: pxToRem(200),
    cursor: 'pointer',
    padding: pxToRem(24),
    borderRadius: pxToRem(12),
    boxShadow: '0 0 2px 0 rgb(145 158 171 / 20%), 0 12px 24px -4px rgb(145 158 171 / 12%)',
    border: `${pxToRem(1)} solid`,
    borderColor: 'transparent',
    backgroundColor: theme.palette.common.white,
    ':hover': {
      backgroundColor: theme.palette.grey[200],
      borderColor: theme.palette.grey[400]
    }
  }
})

export default ClientCard
