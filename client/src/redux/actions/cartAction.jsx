import {
  setCheckoutError,
  setLoadingCheckoutStatus,
  setUrlCheckout,
  cleanCart,
} from '../cart/cartSlice'
import { postPayment } from '../../services/paymentService'

export const checkoutCart = ({ cartItems, email }) => {
  return async (dispatch) => {
    dispatch(setLoadingCheckoutStatus(true))
    try {
      const data = await postPayment({ cartItems, email })
      dispatch(setLoadingCheckoutStatus(false))
      dispatch(setUrlCheckout(data.url))
      dispatch(cleanCart())
    } catch (error) {
      dispatch(setCheckoutError(error.message ?? 'Something went wrong'))
    }
  }
}
