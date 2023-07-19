import axios from 'axios'
import { api } from './api'

const fetchVideogames = async (url) => {
  const response = await axios.get(url)
  return response.data
}

export const getVideogameById = async (url) => {
  const response = await api.get(url)
  return response.data
}

const saveNewVideogame = async (newVideogame) => {
  const response = await api.post('videogames', newVideogame)
  return response.data
}

const updateVideogame = async (id, newVideogame) => {
  const response = await api.put(`videogames/${id}`, newVideogame)
  return response.data
}

export { fetchVideogames, saveNewVideogame, updateVideogame }
