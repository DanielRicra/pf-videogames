import { getVideogameById } from '../services/videoGameService'
import useSWR from 'swr/immutable'

export const useVideogame = (id) => {
  const {
    data: game,
    error,
    isLoading,
    mutate,
  } = useSWR(`videogames/${id}`, getVideogameById)

  return {
    game,
    gameError: error,
    isGameLoading: isLoading,
    mutate,
  }
}
