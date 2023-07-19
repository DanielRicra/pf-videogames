import * as tagService from '../services/tagService'
import useSWRImmutable from 'swr/immutable'
import useSWR from 'swr/immutable'

const API_URL = import.meta.env.VITE_API_URL

export const useTags = () => {
  const { data, error, isLoading } = useSWRImmutable(
    `${API_URL}/tag`,
    tagService.fetchTags
  )

  return {
    tags: data,
    tagsError: error,
    isTagsLoading: isLoading,
  }
}

export const useTagById = (id) => {
  const {
    data: tag,
    error,
    isLoading,
    mutate,
  } = useSWR(`tag/${id}`, tagService.getTagById)

  return {
    tag,
    tagError: error,
    isTagLoading: isLoading,
    mutate,
  }
}