import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Detail from './pages/Detail'
import Search from './pages/Search'

function App() {
  return (
    <div className={'bg-[url(./assets/bg-img.jpg)] h-screen w-screen overflow-hidden'}>
      <div className='overflow-y-auto w-full h-full text-white'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/detail/:id' element={<Detail />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
