import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login/Login'
import DataStewardship from './components/Other/DataStewardship'
import Layout from './components/Layout/Layout'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/data-stewardship",
        element: <DataStewardship />
      }
    ]
  }
])

const App = () => (
  <RouterProvider router={router} />
)

export default App
