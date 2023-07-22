import { getUsers } from '../services/userService'
import useSWR from 'swr/immutable'

export const useUsers = () => {
  const {
    data: users,
    error,
    isLoading,
    mutate,
  } = useSWR('user', getUsers)

  return {
    users,
    usersError: error,
    isUsersLoading: isLoading,
    mutate,
  }
}
