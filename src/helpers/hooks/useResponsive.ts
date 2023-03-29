import { useMediaQuery, useTheme } from '@mui/material'

const useResponsive = () => {
  const theme = useTheme()

  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md'))

  return {
    isMobileOrTablet
  }
}

export default useResponsive
