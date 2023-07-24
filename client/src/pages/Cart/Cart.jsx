/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

import CartItems from './CartItems'
import { checkoutCart } from '../../redux/actions/cartAction'
import { fetchCartByUserEmail, getCartItems } from '../../redux/cart/cartSlice'
import { loadStripe } from '@stripe/stripe-js'
import { selectUser } from '../../redux/user/userSlice'
import CheckoutDetail from './CheckoutDetail'
const VITE_PUBLIC_KEY_STRIPE = import.meta.env.VITE_PUBLIC_KEY_STRIPE

const Cart = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector(getCartItems)
  const { videogames: myVideogames } = useSelector(selectUser)
  const stripePromise = loadStripe(`${VITE_PUBLIC_KEY_STRIPE}`)
  const { user, isAuthenticated, loginWithPopup } = useAuth0()
  const { sessionId, loadingCheckoutStatus } = useSelector(
    (status) => status.cart
  )

  const itemsToGift = useMemo(
    () =>
      cartItems.filter((item) => myVideogames?.some((vg) => vg.id === item.id)),
    [cartItems, myVideogames]
  )
  const myItems = useMemo(
    () =>
      cartItems.filter(
        (item) => !myVideogames?.some((vg) => vg.id === item.id)
      ),
    [cartItems, myVideogames]
  )
  console.log('🚀 ~ file: Cart.jsx:36 ~ Cart ~ myItems:', myItems)

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
    dispatch(checkoutCart({ myItems, email: user?.email }))
  }

  return (
    <div className='min-h-screen flex flex-col justify-start items-start p-4 md:px-6 lg:px-10 xl:px-14 mb-10'>
      <div className='w-full bg-gray-200 text-gray-800 rounded-lg p-6 px-10'>
        <h2 className='text-2xl font-semibold my-3 border-b-2 border-gray-400'>
          Cart Shopping
        </h2>

        {myItems.length > 0 && (
          <div className='border-2 border-white rounded-lg mb-4 p-2'>
            <h3 className='text-lg font-medium'>For my self</h3>
            <CartItems cartItems={myItems} />

            <CheckoutDetail
              handleCheckout={handleCheckout}
              items={myItems}
              loadingCheckoutStatus={loadingCheckoutStatus}
            />
          </div>
        )}

        {itemsToGift.length > 0 && (
          <div className='border-2 border-white rounded-lg p-2'>
            <h3 className='text-lg font-medium'>Gift Videogame</h3>
            <CartItems cartItems={itemsToGift} />

            <CheckoutDetail
              handleCheckout={() => alert('Gift Videogame')}
              items={itemsToGift}
              loadingCheckoutStatus={loadingCheckoutStatus}
            />
          </div>
        )}
      </div>
    </div>
  )
}
export default Cart
