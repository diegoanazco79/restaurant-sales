import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

import ThemeProvider from 'theme'
import AppRoutes from 'routes'

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppRoutes />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
