import { api } from './api'

export const saveUser = async (user) => {
   const response = await api.post('/user', user)
   return response.data
}

export const getUser = async (email) => {
  const response = await api.get(`/user/${email}`)
  return response.data
}

export const getUsers = async () => {
  const response = await api.get(`/user`)
  return response.data
}

export const getUserById = async (id) => {
  const response = await api.get(`/user/friend/${id}`);
  return response.data;
};
