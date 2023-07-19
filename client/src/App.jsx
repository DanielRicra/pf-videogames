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
} from './pages'
import Profile from './pages/Profile'
import { Layout } from './components'
import Library from './pages/Library'

function App() {
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
          </Route>
          <Route path='/dashboard/admin/*' element={<Dashboard />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
