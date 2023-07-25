import { fetchPendingFriendRequests } from '../services/friendService'
import useSWR from 'swr'

export const useUserPendingRequests = ({ email = '' }) => {
  const encodedEmail = encodeURIComponent(email)
  const {
    data: pendingRequests,
    isLoading: loadingPendingRequests,
    error: errorPendingRequests,
    mutate,
  } = useSWR(`/friend/pending/${encodedEmail}`, fetchPendingFriendRequests)

  return {
    pendingRequests,
    loadingPendingRequests,
    errorPendingRequests,
    mutate,
  }
}
