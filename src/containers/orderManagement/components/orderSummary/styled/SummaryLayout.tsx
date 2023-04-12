import { styled } from '@mui/material/styles'
import { Container, useTheme } from '@mui/material'

import { pxToRem } from 'theme/helpers/functions'

interface Props {
  isMobileOrTablet: boolean
}

const SummaryLayout = styled(Container)(({ isMobileOrTablet }: Props) => {
  const theme = useTheme()

  const padding = isMobileOrTablet ? '0 !important' : '15px 5px 15px 0 !important'

  return {
    borderRight: isMobileOrTablet ? 'transparent' : `${pxToRem(1)} solid ${theme.palette.grey[400]}`,
    height: '100%',
    padding
  }
})

export default SummaryLayout
