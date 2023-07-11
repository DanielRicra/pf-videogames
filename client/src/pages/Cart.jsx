import { IconTrashFilled } from '@tabler/icons-react'
import { useDispatch, useSelector } from 'react-redux'
import { getCartItems, removeFromCart } from '../redux/cart/cartSlice'

const Cart = () => {
  const cartItems = useSelector(getCartItems)
  const dispatch = useDispatch()

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id))
  }

  return (
    <div className='min-h-screen flex flex-col justify-start items-start p-4 md:px-6 lg:px-10 xl:px-14'>
      <div className='w-full bg-gray-100 text-black rounded-lg p-4'>
        <h2 className='text-2xl font-semibold my-3'>Cart Shopping</h2>
        {cartItems.map((item) => (
          <div key={item.id} className='flex items-center my-3 justify-between'>
            <div>
              <div className='flex items-center w-[160px] aspect-[4/3]'>
                <img
                  src={item.image}
                  alt={item.name}
                  className='w-full h-full object-cover'
                />
              </div>
              <p>{item.name}</p>
            </div>
            <div className='flex items-end gap-2 flex-col '>
              <button onClick={() => handleRemoveItem(item.id)}>
                <IconTrashFilled className='text-red-600' />
              </button>
              <p className='font-semibold text-purple-800'>{item.price} $</p>
            </div>
          </div>
        ))}

        <div className='w-full flex flex-col'>
          <div className='flex items-center justify-between w-full my-3 border-b-2 border-purple-600'>
            <p>Total VideoGames: {cartItems.length}</p>
            <p className='text-2xl'>
              Total Price{' '}
              <span className='font-semibold text-purple-800'>
                {cartItems.reduce(
                  (acc, item) => acc + parseFloat(item.price),
                  0
                )}{' '}
                $
              </span>
            </p>
          </div>

          <button
            type='button'
            className='py-2 text-white px-4 bg-purple-600 rounded-lg hover:opacity-80 self-end'
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}
export default Cart
