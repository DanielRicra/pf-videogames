import { useAuth0 } from '@auth0/auth0-react'
import { IconLogout } from '@tabler/icons-react'
import { twMerge } from 'tailwind-merge'

const LogoutButton = ({ className }) => {
  const { logout } = useAuth0()

  return (
    <button
      className={twMerge('flex gap-2', className)}
      onClick={() => logout()}
    >
      <IconLogout className='w-7 stroke-gray-800' />
      <span>Log out</span>
    </button>
  )
}

export default LogoutButton
