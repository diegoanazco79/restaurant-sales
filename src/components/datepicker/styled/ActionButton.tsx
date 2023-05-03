import { styled } from '@mui/material/styles'
import { Button, alpha, useTheme } from '@mui/material'

import { pxToRem } from 'theme/helpers/functions'

interface Props {
  selected: boolean | null
}

const ActionButton = styled(Button)(({ selected }: Props) => {
  const { palette } = useTheme()

  const background = selected ? alpha(palette.primary.light, 0.4) : alpha(palette.primary.lighter, 0.3)
  const border = selected ? `${pxToRem(1)} solid ${alpha(palette.primary.light, 0.6)} !important` : `${pxToRem(1)} solid ${alpha(palette.primary.light, 0.3)} !important`

  return {
    fontWeight: 500,
    background,
    color: palette.primary.dark,
    border,
    '&:hover': {
      background: alpha(palette.primary.light, 0.4),
      border: `${pxToRem(1)} solid ${alpha(
        palette.primary.light,
        0.6
      )} !important`
    }
  }
})

export default ActionButton
