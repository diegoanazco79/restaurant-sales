import { styled } from '@mui/material/styles'
import { Button } from '@mui/material'

import { pxToRem } from 'theme/helpers/functions'

interface Props {
  isMobileOrTablet: boolean
}

const ActionButton = styled(Button)(({ isMobileOrTablet }: Props) => {
  return {
    width: '100%',
    height: isMobileOrTablet ? pxToRem(45) : pxToRem(60)
  }
})

export default ActionButton
