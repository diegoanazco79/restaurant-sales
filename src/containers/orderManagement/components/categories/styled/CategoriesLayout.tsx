import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'

import { pxToRem } from 'theme/helpers/functions'

const CategoriesLayout = styled(Box)(() => {
  return {
    display: 'flex',
    flexWrap: 'wrap',
    gap: pxToRem(5),
    marginTop: pxToRem(16),
    height: 'fit-content',
    maxHeight: pxToRem(300),
    overflow: 'auto'
  }
})

export default CategoriesLayout
