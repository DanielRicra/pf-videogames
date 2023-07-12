import {
  setLoading,
} from '../videogame/videoGameSlice'

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
