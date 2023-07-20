import { api } from './api'

export const saveUser = async (user) => {
   const response = await api.post('/user', user)
   return response.data
}

export const getUser = async (email) => {
  const response = await api.get(`/user/${email}`)
  return response.data
}
