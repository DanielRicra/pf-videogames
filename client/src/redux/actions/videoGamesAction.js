import { setLoading, currentVideogame } from '../videogame/videoGameSlice';
import axios from 'axios';

export const createVideoGame = () => {
  return async (dispatch) => {
    dispatch(setLoading(true))
    try {
      /* empty */
    } catch (error) {
      /* empty */
    }
  }
}

export const fetchVideogame = (id) => {
  return async (dispatch) => {
    const response = await axios(`https://localhost:3001/videogames/${id}`)
    dispatch(currentVideogame(response.data))
  }
}