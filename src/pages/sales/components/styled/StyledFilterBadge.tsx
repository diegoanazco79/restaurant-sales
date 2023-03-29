import { styled } from '@mui/material/styles'
import { Badge, useTheme } from '@mui/material'

import { pxToRem } from 'theme/helpers/functions'

export const StyledFilterBadge = styled(Badge)(() => {
  const theme = useTheme()

  return {
    padding: 5,
    position: 'fixed',
    bottom: 70,
    zIndex: 10,
    width: 'fit-content',
    left: 0,
    right: 0,
    margin: 'auto',
    borderRadius: pxToRem(5),
    backgroundColor: theme.palette.common.white,
    border: `${pxToRem(1)} solid ${theme.palette.grey[300]}`,
    '& .MuiBadge-standard': {
      fontSize: pxToRem(10),
      fontWeight: 500,
      minWidth: pxToRem(18),
      height: pxToRem(18)
    }
  }
})
