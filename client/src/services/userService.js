import { api } from './api'

export const saveUser = async (user) => {
  const response = await api.post('/user/postUser', user)
  return response.data
}
