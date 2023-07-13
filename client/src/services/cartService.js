import { api } from './api'

export const getCartByUserEmail = async (userEmail) => {
  const response = await api.get(`/cart?userEmail=${userEmail}`)
  return response.data
}

export const addVideogameToUserCart = async ({
  userEmail,
  videogameId,
}) => {
  const response = await api.post(`/cart/add/${videogameId}`, { userEmail })
  return response.data
}

export const removeVideogameFromUserCart = async ({
  userEmail,
  videogameId,
}) => {
  const options = {
    method: 'DELETE',
    url: `/cart/remove/${videogameId}`,
    data: { userEmail: userEmail }
  }
  const response = await api.request(options)
  return response.data
}

export const addVideogamesToUserCart = async ({
  userEmail,
  videogameIds,
}) => {
  const response = await api.post('/cart/add', {
    userEmail,
    videogameIds,
  })
  return response.data

}