import axios from 'axios'

const fetchTags = async (url) => {
  const response = await axios.get(url)
  return response.data
}

export {
  fetchTags
}