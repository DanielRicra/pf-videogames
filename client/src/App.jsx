import { Route, Routes } from 'react-router-dom'
import { Create, Detail, Home, NotFound, Search, Profile } from './pages'
import { NavBar } from './components'

function App() {
  return (
    <div className={'bg-[url(./assets/bg-img.jpg)] h-screen w-screen overflow-hidden'}>
      <div className='overflow-y-auto w-full h-full text-white'>
        <NavBar />
        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/detail/:id' element={<Detail />} />
          <Route path='/create' element={<Create />} />

          <Route path='/profile' element={<Profile />} />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
