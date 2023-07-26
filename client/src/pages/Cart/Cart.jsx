/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Select from 'react-select'
import useSWR from 'swr'

import CartItems from './CartItems'
import { checkoutCart } from '../../redux/actions/cartAction'
import { fetchCartByUserEmail, getCartItems } from '../../redux/cart/cartSlice'
import { loadStripe } from '@stripe/stripe-js'
import { selectUser } from '../../redux/user/userSlice'
import CheckoutDetail from './CheckoutDetail'
import { fetchFriends } from '../../services/friendService'
import { toast } from 'sonner'
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
  const {
    data: friends,
    isLoading: loadingFriends,
    error: errorFriends,
  } = useSWR(`/friend?userEmail=${user?.email ?? ''}`, fetchFriends)

  const [selectedFriend, setSelectedFriend] = useState(null)

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

  const handleCheckout = async ({ cartItems, userEmail, friendEmail = '' }) => {
    if (!isAuthenticated) {
      loginWithPopup({
        redirectUri: window.location.origin + '/cart',
      })
      return
    }

    if (!userEmail) {
      toast.error('Please login or select a friend for the gift')
      return
    }

    dispatch(checkoutCart({ cartItems, email: userEmail, friendEmail }))
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
              handleCheckout={() =>
                handleCheckout({ cartItems: myItems, userEmail: user?.email })
              }
              items={myItems}
              loadingCheckoutStatus={loadingCheckoutStatus}
            />
          </div>
        )}

        {itemsToGift.length > 0 && (
          <div className='border-2 border-white rounded-lg p-2'>
            <h3 className='text-lg font-medium'>Gift Videogame</h3>
            <div>
              <p className=''>Select a friend to gift the game to him/her</p>
              <Select
                isSearchable
                isLoading={loadingFriends}
                options={
                  friends?.results.map((friend) => ({
                    value: friend.id,
                    label: friend.friendUser.name,
                  })) ?? []
                }
                placeholder='Select a friend'
                onChange={(e) => setSelectedFriend(e?.value)}
                className='max-w-[300px] outline-purple-500'
                styles={{
                  control: (styles) => ({
                    ...styles,
                    backgroundColor: 'transparent',
                    border: '2px solid #9333ea',
                    padding: '4px 2px',
                  }),
                }}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: '8px',
                  colors: {
                    ...theme.colors,
                    primary25: '#ca9bf5',
                    primary: '#9333ea',
                    primary50: '#dbbcf8',
                  },
                })}
              />
              <p className='mt-2 text-red-700'>
                {errorFriends && 'Something went wrong fetching friends'}
              </p>
            </div>
            <CartItems cartItems={itemsToGift} />

            <CheckoutDetail
              handleCheckout={() =>
                handleCheckout({
                  cartItems: itemsToGift,
                  userEmail: user?.email,
                  friendEmail:
                    friends?.results.find((f) => f.id === selectedFriend)
                      ?.friendUser.email ?? null,
                })
              }
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
