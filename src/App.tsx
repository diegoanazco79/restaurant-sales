import DashboardLayout from 'layouts/dashboard'
import ThemeProvider from 'theme'

const App = () => {
  return (
    <ThemeProvider>
      <DashboardLayout />
    </ThemeProvider>
  )
}

export default App
