import { Navigate, Outlet } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import Loading from '../Loading'

const ProtectedRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return <Loading />
  }

  if (!isAuthenticated) {
    return <Navigate to='/' />
  }

  return <Outlet />
}
export default ProtectedRoutes
