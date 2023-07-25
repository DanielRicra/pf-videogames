import { api } from './api'

export const fetchPendingFriendRequests = async (url) => {
  const response = await api.get(url)
  return response.data
}

export const addFriend = async (userEmail, friendEmail) => {
  const response = await api.post(
    `/friend?userEmail=${userEmail}&friendEmail=${friendEmail}&action=add`
  )
  return response.data
}

export const acceptFriend = async (userEmail, friendEmail) => {
  const response = await api.post(
    `/friend?userEmail=${userEmail}&friendEmail=${friendEmail}&action=accept`
  )
  return response.data
}

export const rejectFriend = async (userEmail, friendEmail) => {
  const response = await api.post(
    `/friend?userEmail=${userEmail}&friendEmail=${friendEmail}&action=reject`
  )
  return response.data
}

export const getFriends = async (userEmail) => {
  const response = await api.get(`/friend?userEmail=${userEmail}`)
  return response.data
}

export const fetchFriends = async (url) => {
  const response = await api.get(url)
  return response.data
}
