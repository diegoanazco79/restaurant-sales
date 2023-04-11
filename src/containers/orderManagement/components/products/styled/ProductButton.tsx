import { styled } from '@mui/material/styles'
import { Grid, useTheme } from '@mui/material'

import { pxToRem } from 'theme/helpers/functions'

const ProductButton = styled(Grid)(() => {
  const theme = useTheme()
  const hoverBackground = theme.palette.grey[300]

  return {
    display: 'flex',
    borderRadius: pxToRem(5),
    padding: pxToRem(5),
    alignItems: 'center',
    minHeight: pxToRem(40),
    cursor: 'pointer',
    userSelect: 'none',
    fontSize: pxToRem(14),
    justifyContent: 'space-between',
    height: pxToRem(30),
    fontWeight: 500,
    '&:hover': {
      background: hoverBackground
    }
  }
})

export default ProductButton
