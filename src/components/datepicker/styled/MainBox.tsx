import { styled } from '@mui/material/styles'
import { Paper, alpha, useTheme } from '@mui/material'

import { pxToRem } from 'theme/helpers/functions'

const MainBox = styled(Paper)(() => {
  const { palette } = useTheme()

  return {
    position: 'absolute',
    zIndex: 10,
    padding: pxToRem(10),
    width: pxToRem(282),
    border: `${pxToRem(1)} solid ${palette.grey[300]}`,
    '& .react-datepicker': {
      marginLeft: pxToRem(9),
      marginTop: pxToRem(8)
    },
    '& .react-datepicker__header': {
      backgroundColor: palette.grey[200]
    },
    '& .react-datepicker__day': {
      '&--in-range': {
        color: palette.primary.dark,
        backgroundColor: alpha(palette.primary.light, 0.4),
        '&:hover': {
          backgroundColor: alpha(palette.primary.light, 0.8)
        }
      },
      '&--keyboard-selected': {
        backgroundColor: alpha(palette.primary.light, 0.4),
        '&:hover': {
          backgroundColor: alpha(palette.primary.light, 0.8)
        }
      },
      '&--selected': {
        backgroundColor: alpha(palette.primary.light, 0.4)
      },
      '&--in-selecting-range': {
        backgroundColor: `${alpha(palette.primary.lighter, 0.6)} !important`,
        color: palette.primary.dark
      }
    }
  }
})

export default MainBox
