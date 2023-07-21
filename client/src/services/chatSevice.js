import { api } from './api'

export const findOrCreateChat = async (friedShipId) => {
  const response = await api.get(`/chat?friedShipId=${friedShipId}`)
  return response.data
}

export const addMessageToChat = async (friedShipId) => {
  const response = await api.post(`/chat?friedShipId=${friedShipId}`)
  return response.data
}
