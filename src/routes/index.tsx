import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import Loadable from 'routes/components/Loadable'
import ProtectedRoutes from './helpers/ProtectedRoutes'

import { useAuthStore } from 'store/auth'

const DashboardPage = Loadable(lazy(async () => await import('pages/dashboard')))
const LoginPage = Loadable(lazy(async () => await import('pages/login')))
const RestaurantPage = Loadable(lazy(async () => await import('pages/restaurant')))
const DeliveryPage = Loadable(lazy(async () => await import('pages/delivery')))

const AppRoutes = () => {
  const isAuth = useAuthStore((state) => state.isAuth)

  return (
    <Routes>
      <Route index path='/' element={<LoginPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route element={<ProtectedRoutes isAuth={isAuth} />} >
        <Route path='/reports' element={<DashboardPage />} />
        <Route path='/restaurant' element={<RestaurantPage />} />
        <Route path='/delivery' element={<DeliveryPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
