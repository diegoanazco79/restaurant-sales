export default function Table (theme: any) {
  return {
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.primary.lighter
        }
      }
    }
  }
}
