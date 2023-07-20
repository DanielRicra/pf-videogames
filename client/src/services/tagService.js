import axios from 'axios'
import { api } from './api'

const fetchTags = async (url) => {
  const response = await axios.get(url)
  return response.data
}

const saveTag = async (tag) => {
  const response = await api.post('tag', tag)
  return response.data
}

const updateTag = async (id, newTag) => {
  const response = await api.put(`videogames/${id}`, newTag)
  return response.data
}

export {
  fetchTags,
  saveTag,
  updateTag
}