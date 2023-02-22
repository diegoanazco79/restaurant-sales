import { Navigate } from 'react-router-dom'

import MainLayout from 'layouts/dashboard'

interface Props {
  isAuth: boolean
  redirectTo?: string
}

const ProtectedRoutes = ({ isAuth, redirectTo = '/login' }: Props) => {
  if (!isAuth) {
    return <Navigate to={redirectTo} />
  }

  return <MainLayout/>
}

export default ProtectedRoutes
