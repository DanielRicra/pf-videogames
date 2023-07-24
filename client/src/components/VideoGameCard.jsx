/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCartIcon } from './icons'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { IconStarFilled, IconStar } from '@tabler/icons-react'
import {
  addToCart,
  getCartItems,
  removeFromCart,
} from '../redux/cart/cartSlice'
import { useLocalStorage } from '../hooks/useLocalStorage'
import {
  addVideogameToUserCart,
  removeVideogameFromUserCart,
} from '../services/cartService'

const VideoGameCard = ({ videogame, user, owned }) => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const cartItems = useSelector(getCartItems)
  const navigate = useNavigate()
  const [, setValue] = useLocalStorage('shopping-cart', cartItems)
  const cartItem = useMemo(() => {
    return cartItems.find((item) => item.id === videogame.id)
  }, [cartItems, videogame])

  const handleClick = async () => {
    try {
      if (!cartItem) {
        if (user) {
          await addVideogameToUserCart({
            userEmail: user.email,
            videogameId: videogame.id,
          })
        }
        dispatch(addToCart(videogame))
        setIsOpen(true)
        toast.success('Added to cart')
      } else {
        if (user) {
          await removeVideogameFromUserCart({
            userEmail: user.email,
            videogameId: videogame.id,
          })
        }

        dispatch(removeFromCart(videogame.id.toString()))
        toast.success('Removed from cart')
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const stars = useMemo(() => {
    const stars = []
    for (let i = 0; i < 5; i++) {
      if (i < videogame.rating) {
        stars.push(true)
      } else {
        stars.push(false)
      }
    }
    return stars
  }, [videogame])

  useEffect(() => {
    setValue(cartItems)
  }, [cartItems])

  return (
    <>
      <div
        to={`/detail/${videogame.id}`}
        className='min-w-[180px] rounded-md flex flex-col bg-white text-slate-950 shadow-md'
      >
        <Link
          to={`/detail/${videogame.id}`}
          className='w-full h-[220px] rounded-t-lg overflow-hidden'
          title='See details'
        >
          <img
            src={videogame.image}
            alt={videogame.name}
            className='w-full h-full object-cover hover:scale-110 transition-transform duration-300'
          />
        </Link>
        <div className='flex flex-col justify-between gap-1 p-2'>
          <p
            className='text-lg font-semibold text-center truncate'
            title={videogame.name}
          >
            {videogame.name}
          </p>
          <p className='text-lg font-medium text-center'>{videogame.price} $</p>
          <div className='flex justify-between'>
            <button
              className='bg-purple-600 text-white w-full p-2 rounded-lg hover:opacity-85 flex gap-1 justify-center'
              type='button'
              onClick={handleClick}
            >
              <ShoppingCartIcon />
              <span>
                {!cartItem
                  ? !owned
                    ? 'Add to cart'
                    : 'Gift to a friend'
                  : 'Remove from cart'}
              </span>
            </button>
          </div>

          <div className='flex justify-between gap-2 py-1'>
            <div className='starts flex'>
              {stars.map((star, i) => (
                <span key={i}>
                  {star ? (
                    <IconStarFilled className='text-yellow-500 h-5' />
                  ) : (
                    <IconStar className='text-yellow-500 h-5' />
                  )}
                </span>
              ))}
            </div>
            <Link
              to={`/detail/${videogame.id}`}
              className='text-center font-normal text-sm'
            >
              See details
              <span className='text-purple-600'> &rarr;</span>
            </Link>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className='flex justify-center items-center z-50 w-full h-full top-0 left-0 absolute bg-[rgba(0,0,0,0.5)]'>
          <div className='flex flex-col gap-2 rounded-lg bg-gray-100 text-black p-6'>
            <p className='text-lg'>The Videogame has been added to cart</p>

            <div className='border-[1px] border-gray-300 flex gap-2 rounded-lg'>
              <img
                src={videogame.image}
                alt={videogame.name}
                className='w-[80px] h-[102px] object-cover'
              />
              <div className='flex flex-col justify-between p-2'>
                <p className='text-lg'>{videogame.name}</p>
                <p className='self-end'>$ {videogame.price}</p>
              </div>
            </div>

            <div className='flex justify-between gap-2'>
              <button
                onClick={() => setIsOpen(false)}
                type='button'
                className='underline hover:opacity-80'
              >
                Keep Shopping
              </button>
              <button
                type='button'
                onClick={() => {
                  setIsOpen(false)
                  navigate('/cart')
                }}
                className='p-2 px-6 bg-purple-600 text-white rounded-lg hover:opacity-80'
              >
                Go to cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default VideoGameCard
