import { createBrowserRouter } from 'react-router-dom'
import { ErrorPage } from './pages/error-page'
import { Home } from './pages/app/home'
import { ArrayFieldForm } from './pages/app/arrayFieldForm'
import { AppLayout } from './pages/layouts/app-layout'
import { FileFieldForm } from './pages/app/fileFieldForm'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/array-field-form', element: <ArrayFieldForm /> },
      { path: '/form-file-input', element: <FileFieldForm /> },
    ],
  },
])
