import { styled } from '@mui/material/styles'
import { alpha, Button, useTheme } from '@mui/material'

interface Props {
  selected: boolean
}

export const StyledSwitchBtn = styled(Button)(({ selected }: Props) => {
  const theme = useTheme()

  return {
    background: selected ? theme.palette.primary.lighter : 'transparent',
    '&:hover': {
      background: alpha(theme.palette.primary.light, 0.2)
    }
  }
})
