import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: 'jhonson',
  userError: null,
  userLoading: false,
  token: '',
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('userData', JSON.stringify(action.payload));
    },
    setLoading: (state, action) => {
      state.userLoading = action.payload;
    },
    setError: (state, action) => {
      state.userError = action.payload;
    },
  },
});

export const { setUser, setLoading, setError } = userSlice.actions;
