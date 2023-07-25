/* eslint-disable react-hooks/exhaustive-deps */
import { Route, Routes } from 'react-router-dom'
import {
  Cart,
  Chat,
  Detail,
  Home,
  NotFound,
  AboutUs,
  FAQs,
  Favorites,
  EditProfile,
} from './pages'
import { Toaster } from 'sonner'
import Profile from './pages/Profile'
import { Layout, Loading, ProtectedRoutes } from './components'
import Library from './pages/Library'
import { useEffect, lazy, Suspense } from 'react'
import { useDispatch } from 'react-redux'
import { fetchUserByEmail } from './redux/user/userSlice'
import { useAuth0 } from '@auth0/auth0-react'

const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'))
const Search = lazy(() => import('./pages/Search'))

function App() {
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useAuth0()

  useEffect(() => {
    if (isAuthenticated && user) {
      dispatch(fetchUserByEmail(user.email))
    }
  }, [isAuthenticated, user])

  return (
    <div
      className={
        'bg-[url(./assets/bg-img.jpg)] h-screen w-screen overflow-hidden'
      }
    >
      <div className='overflow-y-auto w-full h-full text-white'>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route
              path='/search'
              element={
                <Suspense fallback={<Loading />}>
                  <Search />
                </Suspense>
              }
            />
            <Route path='/detail/:id' element={<Detail />} />
            <Route path='/cart' element={<Cart />} />
            <Route element={<ProtectedRoutes />}>
              <Route path='/profile' element={<Profile />} />
              <Route path='/profile/edit' element={<EditProfile />} />
              <Route path='/library' element={<Library />} />
              <Route path='/chat' element={<Chat />} />
              <Route path='/favorites' element={<Favorites />} />
            </Route>
            <Route path='/about' element={<AboutUs />} />
            <Route path='/faqs' element={<FAQs />} />
          </Route>
          <Route
            path='/dashboard/admin/*'
            element={
              <Suspense fallback={<Loading />}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>

      <Toaster richColors />
    </div>
  )
}

export default App
