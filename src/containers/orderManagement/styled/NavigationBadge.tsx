import { styled } from '@mui/material/styles'
import { Badge, useTheme } from '@mui/material'

import { pxToRem } from 'theme/helpers/functions'

const NavigationBadge = styled(Badge)(() => {
  const theme = useTheme()

  return {
    padding: 5,
    borderRadius: pxToRem(5),
    backgroundColor: theme.palette.common.white,
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `${pxToRem(2)} solid ${theme.palette.background.paper}`,
      padding: '0 4px'
    },
    '& .MuiBadge-standard': {
      fontSize: pxToRem(10),
      fontWeight: 500,
      minWidth: pxToRem(18),
      height: pxToRem(18)
    }
  }
})

export default NavigationBadge
