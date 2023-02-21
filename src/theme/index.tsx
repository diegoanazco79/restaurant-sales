import { useMemo } from "react"
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';


import GlobalStyles from "./components/GlobalStyles";
import componentsOverride from './overrides';

import palette from "./helpers/palette"
import typography from "./helpers/typography"
import { customShadows } from "./helpers/functions"


interface Props {
  children: JSX.Element
}

const ThemeProvider = ({ children }: Props) => {
  const themeOptions = useMemo(
    () => ({
      palette,
      shape: { borderRadius: 6 },
      typography,
      customShadows: customShadows(),
    }),
    []
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme)

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  )
}

export default ThemeProvider