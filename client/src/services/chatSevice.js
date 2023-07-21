import { api } from './api'

export const findOrCreateChat = async (friendShipId) => {
  const response = await api.post(`/chat?friendShipId=${friendShipId}`)
  return response.data
}

export const addMessageToChat = async ({ message, friendShipId }) => {
  const response = await api.post(`/chat?friendShipId=${friendShipId}`, {
    message,
  })
  return response.data
}
