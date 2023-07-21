import { api } from './api'

export const getPendingFriendRequests = async (userEmail) => {
  try {
    const encodedEmail = encodeURIComponent(userEmail)
    const response = await api.get(`/friend/pending/${encodedEmail}`)
    return response.data
  } catch (error) {
    throw new Error('Error fetching pending friend requests')
  }
}

export const addFriend = async (userEmail, friendEmail) => {
  const response = await api.post(`/friend?userEmail=${userEmail}&friendEmail=${friendEmail}&action=add`)
  return response.data
}

export const acceptFriend = async (userEmail, friendEmail) => {
  const response = await api.post(`/friend?userEmail=${userEmail}&friendEmail=${friendEmail}&action=accept`)
  return response.data
}

export const rejectFriend = async (userEmail, friendEmail) => {
  const response = await api.post(`/friend?userEmail=${userEmail}&friendEmail=${friendEmail}&action=reject`)
  return response.data
}