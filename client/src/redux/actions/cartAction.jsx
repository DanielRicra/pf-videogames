import axios from 'axios'
import { setCheckoutError, setLoadingCheckoutStatus, setUrlCheckout } from '../cart/cartSlice'

export const checkoutCart = ({ cartItems, userId }) => {
  return async (dispatch) => {
    dispatch(setLoadingCheckoutStatus(true))
    try {
      const { data } = await axios.post(
        'http://localhost:3001/payment/create-checkout-session',
        { cartItems, userId }
      )
      dispatch(setLoadingCheckoutStatus(false))
      dispatch(setUrlCheckout(data.url))
    } catch (error) {
      dispatch(setCheckoutError(error.message ?? 'Something went wrong'))
    }
  }
}
