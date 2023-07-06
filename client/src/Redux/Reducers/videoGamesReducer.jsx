import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  videoGames: [],
};

export const videoGamesSlice = createSlice({
  name: 'videoGames',
  initialState,
  reducers: {
    setVideosgames: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.userLoading = action.payload;
    },
    setError: (state, action) => {
      state.userError = action.payload;
    },
  },
});

export const { setVideosgames, setLoading, setError } = videoGamesSlice.actions;
