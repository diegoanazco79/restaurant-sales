import { styled } from '@mui/material/styles'
import { Button, useTheme } from '@mui/material'

import { pxToRem } from 'theme/helpers/functions'

const ActionButton = styled(Button)(() => {
  const theme = useTheme()

  console.log(theme)

  return {
    width: '100%',
    height: pxToRem(60)
  }
})

export default ActionButton
