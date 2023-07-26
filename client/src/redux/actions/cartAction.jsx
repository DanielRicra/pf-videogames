import {
  setCheckoutError,
  setLoadingCheckoutStatus,
  setSessionId,
  cleanCart,
} from '../cart/cartSlice'
import { postPayment } from '../../services/paymentService'

export const checkoutCart = ({ cartItems, email, friendEmail = '' }) => {
  return async (dispatch) => {
    dispatch(setLoadingCheckoutStatus(true))
    try {
      const sessionId = await postPayment({ cartItems, email, friendEmail })
      dispatch(setLoadingCheckoutStatus(false))
      dispatch(setSessionId(sessionId))
      dispatch(cleanCart())
    } catch (error) {
      dispatch(setCheckoutError(error.message ?? 'Something went wrong'))
    }
  }
}
