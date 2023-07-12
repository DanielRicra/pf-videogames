import axios from 'axios'

const api = axios.create({ 
  baseURL: 'http://localhost:3001/'
})

const fetchVideogames = async (url) => {
  const response = await axios.get(url)
  return response.data
}

const saveNewVideogame = async (newVideogame) => {
  const response = await api.post('videogames', newVideogame)
  return response.data
}

export { fetchVideogames, saveNewVideogame }
