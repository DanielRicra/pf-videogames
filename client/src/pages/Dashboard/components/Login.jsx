import { useState } from 'react'
import { useLogin, useNotify } from 'react-admin'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const login = useLogin()
  const notify = useNotify()

  const handleSubmit = (e) => {
    e.preventDefault()
    login({ username, password }).catch(() =>
      notify('Invalid email or password')
    )
  }

  return (
    <div className='min-h-screen flex justify-center items-center'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col p-4 rounded-lg max-w-[400px]'
      >
        <label htmlFor='username' className='flex flex-col'>
          <span>Username</span>
          <input
            id='username'
            name='username'
            type='text'
            formNoValidate={true}
            value={username}
            className='p-3 rounded-lg mb-4'
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label htmlFor='password' className='flex flex-col'>
          <span>Password</span>
          <input
            id='password'
            name='password'
            type='password'
            value={password}
            className='p-3 rounded-lg mb-4'
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <input
          type='submit'
          value='Login'
          className='bg-purple-500 p-3 rounded-lg text-white mt-4 hover:bg-purple-700 transition-colors cursor-pointer'
        />
        <Link to='/' className='mt-4 text-center underline hover:opacity-75'>
          Go back to Videogame Store
        </Link>
      </form>
    </div>
  )
}

export default LoginPage
