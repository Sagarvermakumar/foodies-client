import { lazy, Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom'
import LoadingProvider from './components/LoadingProvider.jsx'
import BASE_URL from './config.js'
import './index.css'
import { authSelectors } from './store/selectors/authSelectors'
import { setLoading, userExist, userNotExist } from './store/slices/authSlice'
import axiosClient from './utils/axiosClient.js'

// Lazy load all pages
const DynamicSEO = lazy(() => import('./components/DynamicSEO.jsx'))
const GlobalLoader = lazy(() => import('./components/GlobalLoader.jsx'))
const Layout = lazy(() => import('./components/Layout.jsx'))
const ProtectRoute = lazy(() => import('./routes/ProtectedRoute.jsx'))
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Menu = lazy(() => import('./pages/Menu'))
const Cart = lazy(() => import('./pages/Cart'))
const Checkout = lazy(() => import('./pages/Checkout'))
const Orders = lazy(() => import('./pages/Orders'))
const OrderDetails = lazy(() => import('./pages/OrderDetails'))
const Profile = lazy(() => import('./pages/Profile'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const ResetPassword = lazy(() => import('./pages/ResetPassword'))
const ChangePassword = lazy(() => import('./pages/ChangePassword.jsx'))
function App() {
  const dispatch = useDispatch()

  const user = useSelector(authSelectors.getUser)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosClient.get(`${BASE_URL}/api/v1/auth/me`, {
          withCredentials: true,
        })
        dispatch(userExist({ user: res?.data?.user }))
      } catch (error) {
        dispatch(
          userNotExist(error?.response?.data?.message || 'Authentication failed')
        )
        dispatch(setLoading(false))
      }
    }
    checkAuth()
  }, [dispatch])

  const loading = useSelector(authSelectors.isLoading)

  return (
    <Router>
      <DynamicSEO />
      <LoadingProvider>
        <Suspense fallback={<GlobalLoader />}>
          <Routes>
            {/* Public Routes */}
            <Route
              path="/login"
              element={
                <ProtectRoute user={!user} loading={loading} redirect="/">
                  <Login />
                </ProtectRoute>
              }
            />

            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Protected Routes with Layout */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="menu" element={<Menu />} />

              <Route
                path="cart"
                element={
                  <ProtectRoute user={user} loading={loading}>
                    <Cart />
                  </ProtectRoute>
                }
              />
              <Route
                path="checkout"
                element={
                  <ProtectRoute user={user} loading={loading}>
                    <Checkout />
                  </ProtectRoute>
                }
              />
              <Route
                path="orders"
                element={
                  <ProtectRoute user={user} loading={loading}>
                    <Orders />
                  </ProtectRoute>
                }
              />
              <Route
                path="orders/:orderId/:cartId"
                element={
                  <ProtectRoute user={user} loading={loading}>
                    <OrderDetails />
                  </ProtectRoute>
                }
              />
              <Route
                path="profile"
                element={
                  <ProtectRoute user={user} loading={loading} >
                    <Profile />
                  </ProtectRoute>
                }
              />
              <Route
                path="change-password"
                element={
                  <ProtectRoute>
                    <ChangePassword />
                  </ProtectRoute>
                }
              />
            </Route>

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </LoadingProvider>
    </Router>
  )
}

export default App
