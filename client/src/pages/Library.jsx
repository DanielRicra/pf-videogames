import { useEffect, useState } from 'react'
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

        <div className='flex flex-col gap-2 px-4'>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className='flex items-center my-3 justify-between border-b-[1px] border-white pb-2'
            >
              <div className='flex items-start gap-2'>
                <div className='flex items-center w-[80px] h-[102px] overflow-hidden'>
                  <img
                    src={item.image}
                    alt={item.name}
                    className='w-full h-full object-cover'
                  />
                </div>
                <p>{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Library
