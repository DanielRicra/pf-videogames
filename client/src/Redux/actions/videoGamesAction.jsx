import { setLoading } from '../Reducers/userReducer';

export const createVideoGame = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      /* empty */
    } catch (error) {
      /* empty */
    }
  };
};
