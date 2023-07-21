import { api } from './api'

export const getFriends = async (userEmail) => {
  const response = await api.get(`/friend?userEmail=${userEmail}`)
  return response.data
}
