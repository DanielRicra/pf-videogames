import { Link } from 'react-router-dom'
import { HeartIcon, ShoppingCartIcon, UserIcon } from '../icons'
import SearchBar from '../SearchBar'
import { useAuth0 } from '@auth0/auth0-react'
import LogoutButton from '../LogoutButton'
import LoginButton from '../LoginButton'

const NavBar = () => {
  const { isAuthenticated, isLoading, user } = useAuth0()

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
        <Link
          to='/favorites'
          className='hover:bg-[rgba(0,0,0,0.4)] p-2 rounded-md'
        >
          <HeartIcon className='h-7 w-7' />
        </Link>

        {isLoading && (
          <div className='w-8 h-8 rounded-full animate-pulse bg-gray-400' />
        )}
        {isAuthenticated ? (
          <div className='relative hover:bg-[rgba(0,0,0,0.4)] p-2 rounded-md group'>
            <img
              src={user.picture}
              alt='avatar'
              title={user.name}
              className='w-8 h-8 rounded-full cursor-pointer'
            />

            <div className='absolute top-[44px] hidden right-0 text-black bg-white flex-col py-2 rounded-lg box-border group-hover:flex'>
              <Link
                to='/profile'
                className='flex gap-2 hover:bg-purple-500 py-1 px-2'
              >
                <UserIcon className='h-6 -ml-[1px]' />
                <span className='whitespace-nowrap'>See Profile</span>
              </Link>
              <LogoutButton className='w-full flex items-center hover:bg-purple-500 py-1 px-2' />
            </div>
          </div>
        ) : (
          <LoginButton className='gap-[2px] items-center hover:bg-[rgba(0,0,0,0.4)] p-2 rounded-md' />
        )}

        <Link to='/cart' className='hover:bg-[rgba(0,0,0,0.4)] p-2 rounded-md'>
          <ShoppingCartIcon className='cursor-pointer w-7 h-7' />
        </Link>
      </div>
    </nav>
  )
}

export default NavBar
