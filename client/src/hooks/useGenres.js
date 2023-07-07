import * as genreService from '../services/genreService'
import useSWRImmutable from 'swr/immutable'

export const useGenres = () => {
  const { data, error, isLoading } = useSWRImmutable(
    'http://localhost:3001/genre',
    genreService.fetchGenres
  )

  return {
    genres: data,
    genresError: error,
    isGenresLoading: isLoading,
  }
}
