import axios from 'axios'

const fetchGenres = async (url) => {
  const response = await axios.get(url)
  return response.data
}

export {
  fetchGenres
}