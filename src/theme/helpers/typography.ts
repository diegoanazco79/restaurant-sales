import { pxToRem, responsiveFontSizes } from './functions'

const FONT_PRIMARY = 'Public Sans, sans-serif'

const typography = {
  fontFamily: FONT_PRIMARY,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  h1: {
    fontWeight: 800,
    lineHeight: 80 / 64,
    fontSize: pxToRem(40),
    color: '#212B36',
    ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 })
  },
  h2: {
    fontWeight: 800,
    lineHeight: 64 / 48,
    fontSize: pxToRem(32),
    color: '#212B36',
    ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 })
  },
  h3: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(24),
    color: '#212B36',
    ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 })
  },
  h4: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(20),
    color: '#212B36',
    ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 })
  },
  h5: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(18),
    color: '#212B36',
    ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 })
  },
  h6: {
    fontWeight: 700,
    lineHeight: 28 / 18,
    fontSize: pxToRem(17),
    color: '#212B36',
    ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 })
  },
  subtitle1: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(16),
    color: '#212B36'
  },
  subtitle2: {
    fontWeight: 600,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
    color: '#212B36'
  },
  body1: {
    lineHeight: 1.5,
    fontSize: pxToRem(16),
    color: '#212B36'
  },
  body2: {
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
    color: '#212B36'
  },
  caption: {
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    color: '#212B36'
  },
  overline: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(12)
  },
  button: {
    fontWeight: 700,
    lineHeight: 24 / 14,
    fontSize: pxToRem(14)
  }
}

export default typography
