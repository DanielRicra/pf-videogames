import { useAuth0 } from '@auth0/auth0-react'
import { IconLogout } from '@tabler/icons-react'

const LogoutButton = () => {
  const { logout } = useAuth0()

  return (
    <button
      className='flex text-base font-semibold bg-purple-600 border-purple-700 hover:bg-purple-700 hover:border-purple-600 transition duration-200 ease-in border-[1px] rounded-[0.5rem] px-4 py-2 gap-2'
      onClick={() => logout()}
    >
      Log out
      <IconLogout />
    </button>
  )
}

export default LogoutButton
