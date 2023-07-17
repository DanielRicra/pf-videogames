import { Route, Routes } from 'react-router-dom'
import { Cart, Create, Detail, Home, NotFound, Search } from './pages'
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
            <Route path='/create' element={<Create />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/library' element={<Library />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
