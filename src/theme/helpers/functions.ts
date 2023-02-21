import { alpha } from '@mui/material/styles'

import palette from './palette'

interface BreakpointsProps {
  sm: number
  md: number
  lg: number
}

/**
 * Convert a pixeles to rem
 * @param {number} value - number - The value to convert to rem.
 * @returns A string.
 */
export const pxToRem = (value: number) => {
  return `${value / 16}rem`
}

/**
 * Convert a fontsize for responsive views
 * @param {BreakpointsProps}  - Breakpoints
 * @returns An object with 3 keys, each with a media query and a fontSize property.
 */
export const responsiveFontSizes = ({ sm, md, lg }: BreakpointsProps) => {
  return {
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm)
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md)
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg)
    }
  }
}

export const customShadows = () => {
  const color = palette.grey[500]

  const transparent = alpha(color, 0.16)
  return {
    z1: `0 1px 2px 0 ${transparent}`,
    z4: `0 4px 8px 0 ${transparent}`,
    z8: `0 8px 16px 0 ${transparent}`,
    z12: `0 12px 24px -4px ${transparent}`,
    z16: `0 16px 32px -4px ${transparent}`,
    z20: `0 20px 40px -4px ${transparent}`,
    z24: `0 24px 48px 0 ${transparent}`,

    primary: `0 8px 16px 0 ${alpha(palette.primary.main, 0.24)}`,
    info: `0 8px 16px 0 ${alpha(palette.info.main, 0.24)}`,
    secondary: `0 8px 16px 0 ${alpha(palette.secondary.main, 0.24)}`,
    success: `0 8px 16px 0 ${alpha(palette.success.main, 0.24)}`,
    warning: `0 8px 16px 0 ${alpha(palette.warning.main, 0.24)}`,
    error: `0 8px 16px 0 ${alpha(palette.error.main, 0.24)}`,

    card: `0 0 2px 0 ${alpha(color, 0.2)}, 0 12px 24px -4px ${alpha(color, 0.12)}`,
    dialog: `-40px 40px 80px -8px ${alpha(color, 0.24)}`,
    dropdown: `0 0 2px 0 ${alpha(color, 0.24)}, -20px 20px 40px -4px ${alpha(color, 0.24)}`
  }
}
