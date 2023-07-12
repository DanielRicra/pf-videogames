import { useEffect } from 'react'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'

import Carrousel from '../components/Carrousel'
import { videogames } from '../utils/dumbData'
import { Link } from 'react-router-dom'

import LoginButton from '../components/LoginButton'
import Profile from '../components/Profile'
import LogoutButton from '../components/LogoutButton'
import { Loading } from '../components'

const Home = () => {
  const { isAuthenticated, isLoading, user } = useAuth0()

  useEffect(() => {
    const createUser = async () => {
      try {
        if (isAuthenticated) {
          const postData = {
            name: user.name,
            email: user.email,
            nickname: user.nickname,
          };
    
              await axios.post('http://localhost:3001/user/postUser', postData)
    
        }
      } catch (error) {
        console.log(error)
      }
    };

    createUser()
  }, [isAuthenticated, user])

  if (isLoading) return <Loading />

  return (
    <div className='text-white min-h-screen py-14'>
      <div className='font-medium mb-5 text-7xl whitespace-normal ml-12'>
        <h1 className='my-10 ml-2 lg:ml-10'>
          Welcome to <span className='text-purple-400'>the best</span> <br /> PC
          videogames <br /> E-commerce
        </h1>
      </div>

      <br />

      <div className='mb-5 mx-12 flex justify-between items-center'>
        <h3 className='ml-2 text-4xl lg:ml-10 font-normal'>Popular Games</h3>
        <Link to='/search' className='text-base'>
          See all the games &#8594;
        </Link>
      </div>

      <Carrousel videGames={videogames} />
      <br />

      <div className='font-medium text-6xl mt-12 flex justify-center items-center min-h-screen'>
        <h2>Join the community</h2>
      </div>

      {isAuthenticated ? <LogoutButton /> : <LoginButton />}

      <Profile />
    </div>
  )
}

export default Home
