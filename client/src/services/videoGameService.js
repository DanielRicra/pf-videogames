import axios from 'axios'

const fetchVideogames = async (url) => {
  const response = await axios.get(url)
  return response.data
}

export {
  fetchVideogames
}
