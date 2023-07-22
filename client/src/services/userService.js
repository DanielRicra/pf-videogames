import { api } from './api'

export const saveUser = async (user) => {
  const response = await api.post('/user', user)
  return response.data
}

export const getUser = async (email) => {
  const response = await api.get(`/user/${email}`)
  return response.data
}

export const getUserById = async (url) => {
  const response = await api.get(url)
  return response.data
}

export const updateUser = async ({ id, user }) => {
  const response = await api.put(`/user/${id}`, user)
  return response.data
}
