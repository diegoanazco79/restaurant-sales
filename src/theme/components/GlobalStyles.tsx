import { GlobalStyles as MUIGlobalStyles, alpha, useTheme } from '@mui/material'

import { pxToRem, responsiveFontSizes } from 'theme/helpers/functions'

const GlobalStyles = () => {
  const { palette } = useTheme()

  return (
    <MUIGlobalStyles
      styles={{
        '*': {
          boxSizing: 'border-box'
        },
        html: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
          WebkitOverflowScrolling: 'touch'
        },
        '::-webkit-scrollbar': {
          width: pxToRem(5)
        },
        '::-webkit-scrollbar-track': {
          backgroundColor: palette.grey[200]
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: '#888',
          borderRadius: pxToRem(5)
        },
        body: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
          '& .formik-error': {
            color: palette.error.main,
            fontSize: pxToRem(14)
          },
          '& .swal2-container': {
            zIndex: 10000,
            '& .swal2-title': {
              fontWeight: 700,
              lineHeight: 1.5,
              fontSize: pxToRem(20),
              color: '#212B36',
              ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 })
            },
            '& .swal2-html-container': {
              lineHeight: 1.5,
              fontSize: pxToRem(16),
              color: '#212B36'
            },
            '& .swal2-actions': {
              width: '100%',
              justifyContent: 'space-around',
              '& .swal2-confirm': {
                fontWeight: 600,
                fontFamily: 'Montserrat',
                lineHeight: 24 / 14,
                fontSize: pxToRem(14),
                backgroundColor: palette.primary.main,
                ':focus': {
                  outline: 'none',
                  boxShadow: 'none'
                },
                ':hover': {
                  backgroundColor: palette.primary.dark
                }
              },
              '& .swal2-cancel': {
                fontWeight: 600,
                fontFamily: 'Montserrat',
                lineHeight: 24 / 14,
                fontSize: pxToRem(14),
                color: palette.grey[800],
                backgroundColor: palette.grey[300],
                ':hover': {
                  backgroundColor: alpha(palette.grey[400], 0.5)
                },
                ':focus': {
                  outline: 'none',
                  boxShadow: 'none'
                }
              }
            }
          },
          '& .MuiAutocomplete-listbox': {
            fontSize: pxToRem(14)
          }
        },
        '#root': {
          width: '100%',
          height: '100%'
        },
        input: {
          '&[type=number]': {
            MozAppearance: 'textfield',
            '&::-webkit-outer-spin-button': {
              margin: 0,
              WebkitAppearance: 'none'
            },
            '&::-webkit-inner-spin-button': {
              margin: 0,
              WebkitAppearance: 'none'
            }
          }
        },
        img: {
          display: 'block',
          maxWidth: '100%'
        },
        ul: {
          margin: 0,
          padding: 0
        }
      }}
    />
  )
}

export default GlobalStyles
