import * as genreService from '../services/genreService'
import useSWRImmutable from 'swr/immutable'
import useSWR from 'swr/immutable'

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

export const useGenreById = (id) => {
  const {
    data: genre,
    error,
    isLoading,
    mutate,
  } = useSWR(`genre/${id}`, genreService.getGenreById)

  return {
    genre,
    genreError: error,
    isGenreLoading: isLoading,
    mutate,
  }
}