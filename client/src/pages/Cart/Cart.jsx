/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { IconLoader3 } from '@tabler/icons-react'

import { checkoutCart } from '../../redux/actions/cartAction'
import { fetchCartByUserEmail, getCartItems } from '../../redux/cart/cartSlice'
import { formatMoney } from '../../utils/helpers'
import { loadStripe } from '@stripe/stripe-js'
const VITE_PUBLIC_KEY_STRIPE = import.meta.env.VITE_PUBLIC_KEY_STRIPE

const Cart = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector(getCartItems)
  const stripePromise = loadStripe(`${VITE_PUBLIC_KEY_STRIPE}`)
  const { user, isAuthenticated, loginWithPopup } = useAuth0()
  const { sessionId, loadingCheckoutStatus } = useSelector(
    (status) => status.cart
  )

  useEffect(() => {
    if (sessionId) {
      openStripeCheckout()
    }
  }, [sessionId])

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCartByUserEmail(user.email ?? ''))
    }
  }, [isAuthenticated, user])

  const openStripeCheckout = async () => {
    const stripe = await stripePromise
    await stripe.redirectToCheckout({
      sessionId: sessionId.id,
    })
  }

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      loginWithPopup({
        redirectUri: window.location.origin + '/cart',
      })
      return
    }
    dispatch(checkoutCart({ cartItems, email: user?.email }))
  }

  return (
    <div className='min-h-screen flex flex-col justify-start items-start p-4 md:px-6 lg:px-10 xl:px-14 mb-10'>
      <div className='w-full bg-gray-200 text-gray-800 rounded-lg p-6 px-10'>
        <h2 className='text-2xl font-semibold my-3 border-b-2 border-gray-400'>
          Cart Shopping
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
