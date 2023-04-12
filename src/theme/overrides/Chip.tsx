import { alpha } from '@mui/material/styles'

import { pxToRem } from 'theme/helpers/functions'

export default function Chip (theme: any) {
  return {
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: pxToRem(6),
          height: pxToRem(25)
        },
        colorError: {
          backgroundColor: `${alpha(theme.palette.error.main, 0.16)}`,
          '& .MuiTypography-root': {
            color: theme.palette.error.dark
          }
        },
        colorSuccess: {
          backgroundColor: `${alpha(theme.palette.success.main, 0.16)}`,
          '& .MuiTypography-root': {
            color: theme.palette.success.dark
          }
        },
        colorWarning: {
          backgroundColor: `${alpha(theme.palette.warning.main, 0.3)}`,
          '& .MuiTypography-root': {
            color: theme.palette.warning.dark
          }
        }
      }
    }
  }
}
