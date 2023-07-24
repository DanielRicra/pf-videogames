import { api } from './api'

const saveFavorite = async (email, videogameId) => {
  const response = await api.post(
    `/user/favorites?email=${email}&videogameId=${videogameId}`
  )
  return response.data
}

const deleteFavorite = async (id) => {
  const response = await api.delete(`/user/favorites/${id}`)
  return response.data
}

const getUserFavorites = async (url) => {
  const response = await api.get(url)
  return response.data
}

export { saveFavorite, deleteFavorite, getUserFavorites }
