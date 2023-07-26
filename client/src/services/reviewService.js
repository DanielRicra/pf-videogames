import { api } from './api'

export const getReviewByVideogameId = async (id) => {
  const response = await api.get(`/review/videogame/${id}`)
  return response.data
}

export const saveReview = async (review) => {
  const response = await api.post('/review', review)
  return response.data
}

export const updateReview = async ({ id, data}) => {
  const response = await api.put(`/review/${id}`, data)
  return response.data
}
