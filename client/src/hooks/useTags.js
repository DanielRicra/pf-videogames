import * as tagService from '../services/tagService'
import useSWRImmutable from 'swr/immutable'

const API_URL = import.meta.env.VITE_API_URL

export const useTags = () => {
  const { data, error, isLoading } = useSWRImmutable(
    `${API_URL}/tag?limit=25`,
    tagService.fetchTags
  )

  return {
    tags: data,
    tagsError: error,
    isTagsLoading: isLoading,
  }
}
