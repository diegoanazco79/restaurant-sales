import { styled } from '@mui/material/styles'
import { Button, useMediaQuery, useTheme } from '@mui/material'

import { pxToRem } from 'theme/helpers/functions'

const ActionButton = styled(Button)(() => {
  const theme = useTheme()
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md'))

  return {
    width: '100%',
    height: isMobileOrTablet ? pxToRem(45) : pxToRem(60)
  }
})

export default ActionButton
