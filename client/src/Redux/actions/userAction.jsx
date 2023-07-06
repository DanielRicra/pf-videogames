import { setLoading } from '../Reducers/userReducer';

export const createUser = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      /* empty */
    } catch (error) {
      /* empty */
    }
  };
};

export const signIn = () => {
  return async function (dispatch) {
    dispatch(setLoading(true));
    try {
      /* empty */
    } catch (error) {
      /* empty */
    }
  };
};
