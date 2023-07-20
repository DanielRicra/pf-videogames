import axios from 'axios'
import { api } from './api'

const fetchGenres = async (url) => {
  const response = await axios.get(url)
  return response.data
}

const saveGenre = async (genre) => {
  const response = await api.post('genre', genre)
  return response.data
}

const updateGenre = async (id, newGenre) => {
  const response = await api.put(`genre/${id}`, newGenre)
  return response.data
}

export {
  fetchGenres,
  saveGenre,
  updateGenre
}