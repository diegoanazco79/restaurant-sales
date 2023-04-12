import { alpha } from '@mui/material/styles'

export default function Button (theme: any) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            boxShadow: 'none'
          }
        },
        sizeLarge: {
          height: 48
        },
        containedInherit: {
          color: theme.palette.grey[800],
          boxShadow: theme.customShadows.z8,
          textTransform: 'none',
          fontWeight: '600',
          '&:hover': {
            backgroundColor: theme.palette.grey[400]
          }
        },
        containedPrimary: {
          boxShadow: 'none',
          textTransform: 'none',
          fontWeight: '600'
        },
        containedSecondary: {
          boxShadow: theme.customShadows.secondary
        },

        textPrimary: {
          fontSize: '14px',
          textTransform: 'none',
          fontWeight: '600'
        },
        outlinedPrimary: {
          boxShadow: 'none',
          textTransform: 'none',
          fontWeight: '600'
        },
        outlinedInherit: {
          border: `1px solid ${alpha(theme.palette.grey[500], 0.32)}`,
          '&:hover': {
            backgroundColor: theme.palette.action.hover
          }
        },
        textInherit: {
          '&:hover': {
            backgroundColor: theme.palette.action.hover
          }
        }
      }
    }
  }
}
