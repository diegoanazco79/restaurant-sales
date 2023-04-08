import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'

import { pxToRem } from 'theme/helpers/functions'

export const CategoriesLayout = styled(Box)(() => {
  return {
    display: 'flex',
    flexWrap: 'wrap',
    gap: pxToRem(5),
    marginTop: pxToRem(16),
    height: '12%',
    overflow: 'auto'
  }
})
