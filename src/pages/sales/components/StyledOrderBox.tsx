import { styled } from '@mui/material/styles'
import { alpha, Box, useTheme } from '@mui/material'

import { pxToRem } from 'theme/helpers/functions'

import { EMPTY } from 'pages/sales/helpers/constants'

interface Props {
  status: string
}

export const StyledOrderBox = styled(Box)(({ status }: Props) => {
  const theme = useTheme()
  const isEmpty = status === EMPTY

  return {
    height: '184px',
    minHeight: '184px',
    maxHeight: '184px',
    cursor: 'pointer',
    padding: pxToRem(24),
    borderRadius: pxToRem(12),
    boxShadow: '0 0 2px 0 rgb(145 158 171 / 20%), 0 12px 24px -4px rgb(145 158 171 / 12%)',
    border: `${pxToRem(1)} solid`,
    borderColor: isEmpty ? 'transparent' : theme.palette.success.light,
    backgroundColor: isEmpty ? theme.palette.common.white : alpha(theme.palette.success.main, 0.16),
    ':hover': {
      backgroundColor: isEmpty ? theme.palette.grey[200] : alpha(theme.palette.success.dark, 0.25),
      borderColor: isEmpty ? theme.palette.grey[400] : theme.palette.success.dark
    }
  }
})
