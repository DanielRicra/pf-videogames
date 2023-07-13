import { setCheckoutError, setLoadingCheckoutStatus, setUrlCheckout } from '../cart/cartSlice'
import { postPayment } from '../../services/paymentService'

export const checkoutCart = ({ cartItems, userId }) => {
  return async (dispatch) => {
    dispatch(setLoadingCheckoutStatus(true))
    try {
      const data = await postPayment({ cartItems, userId })
      dispatch(setLoadingCheckoutStatus(false))
      dispatch(setUrlCheckout(data.url))
    } catch (error) {
      dispatch(setCheckoutError(error.message ?? 'Something went wrong'))
    }
  }
}
