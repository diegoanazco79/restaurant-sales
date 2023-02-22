import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import Loadable from 'routes/components/Loadable'
import ProtectedRoutes from './helpers/ProtectedRoutes'

const DashboardPage = Loadable(lazy(async () => await import('pages/dashboard')))
const LoginPage = Loadable(lazy(async () => await import('pages/login')))
const SalesPage = Loadable(lazy(async () => await import('pages/sales')))

const AppRoutes = () => {
  return (
    <Routes>
      <Route index path='/' element={<LoginPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route element={<ProtectedRoutes isAuth={true} />} >
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/sales' element={<SalesPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
