import { Link } from 'react-router-dom'
import { HeartIcon, ShoppingCartIcon, UserIcon } from '../icons'
import SearchBar from '../SearchBar'

const NavBar = () => {
  return (
    <nav className='h-24 flex items-center px-14'>
      <div className='flex-1 flex justify-start'>
        <SearchBar />
      </div>

      <div className='flex justify-center'>
        <Link to='/' className=''>
          <p className='text-4xl font-bold text-center text-white'>
            Game<span className='text-purple-400'>Store</span>
          </p>
        </Link>
      </div>

      <div className='flex gap-2 flex-1 justify-end items-center'>
        <Link to='/favorites' className=''>
          <HeartIcon className='cursor-pointer hover:opacity-80 h-7 w-7' />
        </Link>
        <Link to='/profile' className=''>
          <UserIcon className='cursor-pointer hover:opacity-80 h-7 w-7' />
        </Link>
        <Link to='/cart' className=''>
          <ShoppingCartIcon className='cursor-pointer hover:opacity-80 h-7 w-7' />
        </Link>
      </div>
    </nav>
  )
}

export default NavBar
