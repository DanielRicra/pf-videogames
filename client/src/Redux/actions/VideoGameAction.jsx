import {  setLoading } from '../Reducers/videoGamesReducer';

export const createUser = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try { /* empty */ } catch (error) { /* empty */ }
  };
};

export const signIn = () => {
  return async function (dispatch) {
    dispatch(setLoading(true));
    try { /* empty */ } catch (error) { /* empty */ }
  };
};
