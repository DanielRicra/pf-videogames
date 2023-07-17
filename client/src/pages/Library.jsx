import React, { useEffect, useState } from 'react'
import CartItems from './Cart/CartItems'
import { useAuth0 } from '@auth0/auth0-react'
import { getUser } from '../services/userService'

const Library = () => {
  const { isAuthenticated, user } = useAuth0()
  const [cartItems, setCartItems] = useState([])
  useEffect(() => {
    const createUser = async () => {
      try {
        if (isAuthenticated && user.email) {
          const { videogames } = await getUser(user.email)
          setCartItems(videogames)
        }
      } catch (error) {
        console.log(error)
      }
    }

    createUser()
  }, [isAuthenticated, user])
  return (
    <div className='min-h-screen flex flex-col justify-start items-start p-4 md:px-6 lg:px-10 xl:px-14 mb-10'>
      <div className='w-full bg-gray-200 text-gray-800 rounded-lg p-6 px-10'>
        <h2 className='text-2xl font-semibold my-3 border-b-2 border-gray-400'>
          Library of Video Games
        </h2>

        <CartItems cartItems={cartItems} />
      </div>
    </div>
  )
}

export default Library
