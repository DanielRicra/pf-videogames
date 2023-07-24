import { getUserById } from '../services/userService'
import useSWR from 'swr/immutable'

export const useUserById = (id) => {
  const {
    data: user,
    error,
    isLoading,
    mutate,
  } = useSWR(`user/${id}`, getUserById)

  return {
    user,
    userError: error,
    isUserLoading: isLoading,
    mutate,
  }
}
