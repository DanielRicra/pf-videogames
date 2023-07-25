import { fetchFriends } from '../services/friendService'
import useSWR from 'swr'

export const useUserFriends = ({ email }) => {
  const {
    data: friends,
    isLoading: loadingFriends,
    error: errorFriends,
    mutate,
  } = useSWR(`/friend?userEmail=${email ?? ''}`, fetchFriends)

  return {
    friends,
    errorFriends,
    loadingFriends,
    mutate,
  }
}
