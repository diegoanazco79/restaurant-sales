export default function Paper () {
  return {
    MuiPaper: {
      defaultProps: {
        elevation: 0
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: 'rgb(145 158 171 / 4%) 0px 5px 5px -3px, rgb(145 158 171 / 2%) 0px 8px 10px 1px, rgb(145 158 171 / -1%) 0px 3px 14px 2px'
        }
      }
    }
  }
}
