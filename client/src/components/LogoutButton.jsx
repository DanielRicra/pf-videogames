import { useAuth0 } from '@auth0/auth0-react'
import { IconLogout } from '@tabler/icons-react'
import { useDispatch } from 'react-redux'
import { twMerge } from 'tailwind-merge'
import { cleanCart } from '../redux/cart/cartSlice'

const LogoutButton = ({ className }) => {
  const { logout } = useAuth0()
  const dispatch = useDispatch()

  const handleClick = () => {
    localStorage.setItem('shopping-cart', JSON.stringify([]))
    dispatch(cleanCart)
    logout({ returnTo: window.location.origin })
  }

  return (
    <button
      className={twMerge('flex gap-2', className)}
      onClick={handleClick}
    >
      <IconLogout className='w-7 stroke-gray-800' />
      <span>Log out</span>
    </button>
  )
}

export default LogoutButton
