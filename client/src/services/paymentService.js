import { api } from './api'

export const postPayment = async (data) => {
  const response = await api.post('/payment/create-checkout-session', data)
  return response.data
}
