import { styled } from '@mui/material/styles'
import { Container, useTheme } from '@mui/material'

import useResponsive from 'helpers/hooks/useResponsive'
import { pxToRem } from 'theme/helpers/functions'

const SummaryLayout = styled(Container)(() => {
  const theme = useTheme()
  const { isMobileOrTablet } = useResponsive()

  return {
    borderRight: isMobileOrTablet ? 'transparent' : `${pxToRem(1)} solid ${theme.palette.grey[400]}`,
    height: '100%',
    padding: '15px 5px 15px 0 !important'
  }
})

export default SummaryLayout
