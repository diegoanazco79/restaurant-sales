import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import Loadable from 'routes/components/Loadable'
import ProtectedRoutes from './helpers/ProtectedRoutes'

import { useAuthStore } from 'store/auth'

const RoomsPage = Loadable(lazy(async () => await import('pages/rooms')))
const CategoriesPage = Loadable(lazy(async () => await import('pages/categories')))
const ClientsPage = Loadable(lazy(async () => await import('pages/clients')))
const DashboardPage = Loadable(lazy(async () => await import('pages/dashboard')))
const DeliveryPage = Loadable(lazy(async () => await import('pages/delivery')))
const InvoicesPage = Loadable(lazy(async () => await import('pages/invoices')))
const LoginPage = Loadable(lazy(async () => await import('pages/login')))
const ProductsPage = Loadable(lazy(async () => await import('pages/products')))
const RestaurantPage = Loadable(lazy(async () => await import('pages/restaurant')))
const SalesPage = Loadable(lazy(async () => await import('pages/sales')))
const UsersPage = Loadable(lazy(async () => await import('pages/users')))

const AppRoutes = () => {
  const isAuth = useAuthStore((state) => state.isAuth)

  return (
    <Routes>
      <Route index path='/' element={<LoginPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route element={<ProtectedRoutes isAuth={isAuth} />} >
        <Route path='/rooms' element={<RoomsPage />} />
        <Route path='/categories' element={<CategoriesPage />} />
        <Route path='/clients' element={<ClientsPage />} />
        <Route path='/delivery' element={<DeliveryPage />} />
        <Route path='/invoices' element={<InvoicesPage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/reports' element={<DashboardPage />} />
        <Route path='/restaurant' element={<RestaurantPage />} />
        <Route path='/sales' element={<SalesPage />} />
        <Route path='/users' element={<UsersPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
