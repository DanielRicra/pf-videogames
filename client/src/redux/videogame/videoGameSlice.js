import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  videoGames: [],
  detail: {}
};

const videoGamesSlice = createSlice({
  name: 'videoGames',
  initialState,
  reducers: {
    setVideoGames: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.userLoading = action.payload;
    },
    setError: (state, action) => {
      state.userError = action.payload;
    },
    currentVideogame: (state, action) => {
      state.detail = action.payload
    }
  },
});

export const { setVideoGames, setLoading, setError, currentVideogame } = videoGamesSlice.actions;
export default videoGamesSlice.reducer;
