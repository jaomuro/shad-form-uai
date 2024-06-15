import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './pages/layouts/app-layout'
import { ErrorPage } from './pages/error-page'
import { Home } from './pages/app/home'
import { ArrayFieldForm } from './pages/app/arrayFieldForm'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      // { path: '/simple-form', element: <SimpleForm /> },
      { path: '/array-field-form', element: <ArrayFieldForm /> },
    ],
  },
])
