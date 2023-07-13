import { useDispatch, useSelector } from 'react-redux'
import { getCartItems } from '../../redux/cart/cartSlice'
import { formatMoney } from '../../utils/helpers'
import CartItems from './CartItems'
import { useEffect } from 'react'
import { checkoutCart } from '../../redux/actions/cartAction'
import { useAuth0 } from '@auth0/auth0-react'
import { IconLoader3 } from '@tabler/icons-react'
const Cart = () => {
  const cartItems = useSelector(getCartItems)

  const { urlCheckout, loadingCheckoutStatus } = useSelector(
    (status) => status.cart
  )
  const dispatch = useDispatch()
  const { user } = useAuth0()

  useEffect(() => {
    if (urlCheckout) {
      window.location.href = urlCheckout
    }
  }, [urlCheckout])

  const handleCheckout = async () => {
    dispatch(checkoutCart({ cartItems, userId: user?.id }))
  }

  return (
    <div className='min-h-screen flex flex-col justify-start items-start p-4 md:px-6 lg:px-10 xl:px-14 mb-10'>
      <div className='w-full bg-gray-200 text-gray-800 rounded-lg p-6 px-10'>
        <h2 className='text-2xl font-semibold my-3 border-b-2 border-gray-400'>
          Cart Shopping
        </h2>

        <CartItems cartItems={cartItems} />

        <div className='w-full flex flex-col'>
          <div className='flex items-center justify-between w-full my-3 border-b-2 border-gray-400'>
            <p>Total VideoGames: {cartItems.length}</p>
            <div className='text-2xl flex gap-2'>
              <p>Total Price:</p>
              <span className='font-semibold text-purple-800'>
                {formatMoney(
                  cartItems.reduce(
                    (acc, item) => acc + parseFloat(item.price),
                    0
                  )
                )}
              </span>
            </div>
          </div>

          <button
            type='button'
            className='py-2 text-white px-4 bg-purple-600 rounded-lg hover:opacity-80 self-end'
            onClick={handleCheckout}
          >
            {!loadingCheckoutStatus ? (
              'Checkout'
            ) : (
              <IconLoader3 className='animate-spin' size={25} />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
export default Cart
