import { styled } from '@mui/material/styles'
import { alpha, Box, useTheme } from '@mui/material'

import { pxToRem } from 'theme/helpers/functions'

import { BLOCKED, EMPTY, IN_PROGRESS } from '../helpers/constants'

interface Props {
  status: string
}

export const StyledTableBox = styled(Box)(({ status }: Props) => {
  const theme = useTheme()

  /**
   Returns a object with custom styles depending order table status
   * @param {string} status - string
   * @returns An object with the following properties:
   * borderColor, backgroundColor, hoverBackgroundColor, hoverBorderColor
   */
  const getCustomStyles = (status: string) => {
    switch (status) {
      case EMPTY:
        return {
          borderColor: 'transparent',
          backgroundColor: theme.palette.common.white,
          hoverBackgroundColor: theme.palette.grey[200],
          hoverBorderColor: theme.palette.grey[400]
        }
      case IN_PROGRESS:
        return {
          borderColor: theme.palette.success.light,
          backgroundColor: alpha(theme.palette.success.main, 0.16),
          hoverBackgroundColor: alpha(theme.palette.success.dark, 0.25),
          hoverBorderColor: theme.palette.success.dark
        }
      case BLOCKED:
        return {
          borderColor: theme.palette.error.light,
          backgroundColor: alpha(theme.palette.error.main, 0.16),
          hoverBackgroundColor: alpha(theme.palette.error.dark, 0.2),
          hoverBorderColor: theme.palette.error.dark
        }
    }
  }

  return {
    height: pxToRem(184),
    minHeight: pxToRem(184),
    maxHeight: pxToRem(184),
    cursor: 'pointer',
    padding: pxToRem(24),
    borderRadius: pxToRem(12),
    boxShadow: '0 0 2px 0 rgb(145 158 171 / 20%), 0 12px 24px -4px rgb(145 158 171 / 12%)',
    border: `${pxToRem(1)} solid`,
    borderColor: getCustomStyles(status)?.borderColor,
    backgroundColor: getCustomStyles(status)?.backgroundColor,
    ':hover': {
      backgroundColor: getCustomStyles(status)?.hoverBackgroundColor,
      borderColor: getCustomStyles(status)?.hoverBorderColor
    }
  }
})
