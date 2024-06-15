import { ThemeProvider } from '@/themes/provider'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { Toaster } from './components/ui/toaster'

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="shad-form-uai">
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  )
}
