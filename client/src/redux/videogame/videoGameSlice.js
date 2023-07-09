import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  videoGames: [],
  detail: {},
  genresFilter: [],
  tagsFilter: [],
  videoLoading: false,
  videoError: false,
  searchQuery: '',
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
     setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
  },
})

export const getSearchQuery = (state) => state.videoGames.searchQuery
export const getVideoGames = (state) => state.videoGames.videoGames

export const {
  setVideoGames,
  setLoading,
  setError,
  currentVideogame,
  setSearchQuery,
  setTagFilter,
  setGenreFilter,
} = videoGamesSlice.actions
export default videoGamesSlice.reducer
