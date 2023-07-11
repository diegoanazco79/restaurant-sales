import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

import ThemeProvider from 'theme'
import AppRoutes from 'routes'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
})

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
