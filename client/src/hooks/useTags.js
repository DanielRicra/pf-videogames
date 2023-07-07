import * as tagService from '../services/tagService'
import useSWRImmutable from 'swr/immutable'

export const useTags = () => {
  const { data, error, isLoading } = useSWRImmutable(
    'http://localhost:3001/tag',
    tagService.fetchTags
  )

  return {
    tags: data,
    tagsError: error,
    isTagsLoading: isLoading,
  }
}
