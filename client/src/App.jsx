/* eslint-disable react-hooks/exhaustive-deps */
import { Route, Routes } from 'react-router-dom'
import {
  Cart,
  Chat,
  Detail,
  Home,
  NotFound,
  Search,
  AboutUs,
  FAQs,
  Dashboard,
  EditProfile,
} from './pages'
import Profile from './pages/Profile'
import { Layout } from './components'
import Library from './pages/Library'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchUserByEmail } from './redux/user/userSlice'
import { useAuth0 } from '@auth0/auth0-react'

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
            <Route path='/search' element={<Search />} />
            <Route path='/detail/:id' element={<Detail />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/library' element={<Library />} />
            <Route path='/about' element={<AboutUs />} />
            <Route path='/faqs' element={<FAQs />} />
            <Route path='/chat' element={<Chat />} />
            <Route path='/profile/edit' element={<EditProfile />} />
          </Route>
          <Route path='/dashboard/admin/*' element={<Dashboard />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
