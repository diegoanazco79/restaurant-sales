import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import Loadable from 'routes/components/Loadable'
import ProtectedRoutes from './helpers/ProtectedRoutes'

import { useAuthStore } from 'store/auth'

const CategoriesPage = Loadable(lazy(async () => await import('pages/categories')))
const DashboardPage = Loadable(lazy(async () => await import('pages/dashboard')))
const DeliveryPage = Loadable(lazy(async () => await import('pages/delivery')))
const LoginPage = Loadable(lazy(async () => await import('pages/login')))
const ProductsPage = Loadable(lazy(async () => await import('pages/products')))
const RestaurantPage = Loadable(lazy(async () => await import('pages/restaurant')))
const UsersPage = Loadable(lazy(async () => await import('pages/users')))

const AppRoutes = () => {
  const isAuth = useAuthStore((state) => state.isAuth)

  return (
    <Routes>
      <Route index path='/' element={<LoginPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route element={<ProtectedRoutes isAuth={isAuth} />} >
        <Route path='/categories' element={<CategoriesPage />} />
        <Route path='/delivery' element={<DeliveryPage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/reports' element={<DashboardPage />} />
        <Route path='/restaurant' element={<RestaurantPage />} />
        <Route path='/users' element={<UsersPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
