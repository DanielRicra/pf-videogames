import { api } from './api'

export const saveUser = async (user) => {
   const response = await api.post('/user/postUser', user)
   return response.data
}

export const getUserByEmail = async (email) => {
   try {
     const response = await api.get(`/user?email=${email}`)
     return response.data
   } catch (error) {
     throw new Error('Error al obtener el usuario por email')
   }
 }
