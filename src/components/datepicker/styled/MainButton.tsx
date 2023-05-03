import { styled } from '@mui/material/styles'
import { Button, alpha, useTheme } from '@mui/material'

interface Props {
  selected: boolean
  open: boolean
}

const MainButton = styled(Button)(({ selected, open }: Props) => {
  const { palette } = useTheme()

  return {
    fontWeight: 500,
    ...(!open) && {
      borderColor: alpha(palette.grey[500], 0.32),
      color: palette.grey[800]
    },
    ...(selected) && {
      borderColor: palette.primary.light,
      background: alpha(palette.primary.lighter, 0.8)
    },
    '&:hover': {
      color: palette.primary.main
    }
  }
})

export default MainButton
