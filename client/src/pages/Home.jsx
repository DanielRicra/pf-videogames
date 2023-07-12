import Carrousel from '../components/Carrousel'
import { videogames } from '../utils/dumbData'
import { Link } from 'react-router-dom'

import LoginButton from '../components/LoginButton'
import LogoutButton from '../components/LogoutButton'
import { useAuth0 } from '@auth0/auth0-react'
import { Loading } from '../components'

const Home = () => {
  const { isAuthenticated, isLoading } = useAuth0()

  if (isLoading) return <Loading />

  return (
    <div className='text-white min-h-screen py-14'>
      {isAuthenticated && <LogoutButton />}

      <div className='font-medium mb-5 text-7xl whitespace-normal ml-12 min-h-[calc(100vh-120px)] flex justify-start items-center'>
        <h1 className='mt-4 mb-[3rem] ml-2 lg:ml-10'>
          Welcome to <span className='text-purple-400'>the best</span> <br /> PC
          videogames <br /> E-commerce
        </h1>
      </div>

      <div className='mb-5 mx-12 flex justify-between items-center'>
        <h3 className='ml-2 text-4xl lg:ml-10 font-normal'>Popular Games</h3>
        <Link to='/search' className='text-base'>
          See all the games &#8594;
        </Link>
      </div>

      <Carrousel videGames={videogames} />
      <br />

      {!isAuthenticated && (
        <div className='font-medium flex-col text-6xl mt-12 flex justify-center items-center min-h-[calc(100vh-96px)]'>
          <h2>Join the community</h2>
          <LoginButton />
        </div>
      )}
    </div>
  )
}
export default Home
