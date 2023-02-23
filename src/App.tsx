import ThemeProvider from 'theme'
import AppRoutes from 'routes'

const App = () => {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  )
}

export default App