import axios from 'axios'
import {
  setCheckoutError,
  setLoadingCheckoutStatus,
  setUrlCheckout,
  cleanCart,
} from '../cart/cartSlice'

export const checkoutCart = ({ cartItems, email }) => {
  return async (dispatch) => {
    dispatch(setLoadingCheckoutStatus(true))
    try {
      const { data } = await axios.post(
        'http://localhost:3001/payment/create-checkout-session',
        { cartItems, email }
      )
      dispatch(setLoadingCheckoutStatus(false))
      dispatch(setUrlCheckout(data.url))
      dispatch(cleanCart())
    } catch (error) {
      dispatch(setCheckoutError(error.message ?? 'Something went wrong'))
    }
  }
}
