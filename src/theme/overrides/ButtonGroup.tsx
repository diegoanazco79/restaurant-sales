import { alpha } from '@mui/material'

import { pxToRem } from 'theme/helpers/functions'

export default function ButtonGroup (theme: any) {
  return {
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          marginTop: '0 !important',
          '& .MuiButtonBase-root': {
            color: '#103996 !important',
            fontWeight: 500,
            border: `${pxToRem(1)} solid ${alpha(
              theme.palette.primary.light,
              0.3
            )} !important`,
            backgroundColor: alpha(theme.palette.primary.lighter, 0.6),
            '&:hover': {
              background: alpha(theme.palette.primary.light, 0.4)
            }
          }
        }
      }
    }
  }
}
