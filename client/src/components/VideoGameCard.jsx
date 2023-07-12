/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCartIcon } from './icons'
import { useDispatch, useSelector } from 'react-redux'
import {
  addToCart,
  getCartItems,
  removeFromCart,
} from '../redux/cart/cartSlice'
import { useLocalStorage } from '../hooks/useLocalStorage'

const VideoGameCard = ({ videogame }) => {
  const dispatch = useDispatch()
  const cartItems = useSelector(getCartItems)
  const [, setValue] = useLocalStorage('shopping-cart', cartItems)
  const cartItem = useMemo(() => {
    return cartItems.find((item) => item.id === videogame.id)
  }, [cartItems, videogame])

  const handleClick = () => {
    if (!cartItem) {
      dispatch(addToCart(videogame))
    } else {
      dispatch(removeFromCart(videogame.id.toString()))
    }
  }

  useEffect(() => {
    setValue(cartItems)
  }, [cartItems])

  return (
    <div
      to={`/detail/${videogame.id}`}
      className='w-[210px] rounded-md flex flex-col bg-white text-slate-950 shadow-md'
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
            <span>{!cartItem ? 'Add to cart' : 'Remove from cart'}</span>
          </button>
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
  )
}
export default VideoGameCard
