import * as genreService from '../services/genreService'
import useSWRImmutable from 'swr/immutable'

const API_URL = import.meta.env.VITE_API_URL

export const useGenres = () => {
  const { data, error, isLoading } = useSWRImmutable(
    `${API_URL}/genre?limit=100`,
    genreService.fetchGenres
  )

  return {
    genres: data,
    genresError: error,
    isGenresLoading: isLoading,
  }
}
