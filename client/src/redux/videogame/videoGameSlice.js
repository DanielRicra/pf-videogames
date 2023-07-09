import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  videoGames: [],
  detail: {},
  genresFilter: [],
  tagsFilter: [],
  videoLoading: false,
  videoError: false,
}

const videoGamesSlice = createSlice({
  name: 'videoGames',
  initialState,
  reducers: {
    setVideoGames: (state, action) => {
      state.videoGames = action.payload
    },
    setLoading: (state, action) => {
      state.videoLoading = action.payload
    },
    setError: (state, action) => {
      state.videoError = action.payload
    },
    currentVideogame: (state, action) => {
      state.detail = action.payload
    },
    setGenreFilter: (state, action) => {
      state.genresFilter = action.payload
    },
    setTagFilter: (state, action) => {
      state.tagsFilter = action.payload
    },
  },
})

export const {
  setTagFilter,
  setGenreFilter,
  setVideoGames,
  setLoading,
  setError,
  currentVideogame,
} = videoGamesSlice.actions
export default videoGamesSlice.reducer
