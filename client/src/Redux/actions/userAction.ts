import axios from 'axios';
import { setError, setLoading } from '../Reducers/userReducer';

export const createUser = (userData) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
    } catch (error) {}
  };
};

export const signIn = (user) => {
  return async function (dispatch) {
    dispatch(setLoading(true));
    try {
    } catch (error) {}
  };
};
