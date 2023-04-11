import { styled } from '@mui/material/styles'
import { Button, alpha, useTheme } from '@mui/material'

import { pxToRem } from 'theme/helpers/functions'

interface Props {
  selected: boolean
}

const CategoryButton = styled(Button)(({ selected }: Props) => {
  const theme = useTheme()
  const background = selected
    ? alpha(theme.palette.primary.light, 0.4)
    : alpha(theme.palette.primary.lighter, 0.6)
  const border = selected
    ? `${pxToRem(1)} solid ${theme.palette.primary.light}`
    : `${pxToRem(1)} solid ${alpha(theme.palette.primary.light, 0.3)}`
  const hoverBackground = alpha(theme.palette.primary.light, 0.4)

  return {
    borderRadius: pxToRem(30),
    border,
    background,
    color: theme.palette.primary.dark,
    fontSize: pxToRem(13),
    height: pxToRem(30),
    fontWeight: 500,
    '&:hover': {
      background: hoverBackground
    }
  }
})

export default CategoryButton
