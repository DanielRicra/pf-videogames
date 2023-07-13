import { useAuth0 } from '@auth0/auth0-react'
import { twMerge } from 'tailwind-merge'
import { IconLogin } from '@tabler/icons-react'

const LoginButton = ({ className }) => {
  const { loginWithRedirect } = useAuth0()

  return (
    <>
      <button
        className={twMerge('flex gap-2', className)}
        onClick={() => loginWithRedirect()}
      >
        <IconLogin className='h-7 w-7' />
        <span>Log in</span>
      </button>
    </>
  )
}

export default LoginButton
