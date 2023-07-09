import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  videoGames: [],
  searchQuery: '',
  detail: {},
}

const videoGamesSlice = createSlice({
  name: 'videoGames',
  initialState,
  reducers: {
    setVideoGames: (state, action) => {
      state.user = action.payload
    },
    setLoading: (state, action) => {
      state.userLoading = action.payload
    },
    setError: (state, action) => {
      state.userError = action.payload
    },
    currentVideogame: (state, action) => {
      state.detail = action.payload
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
} = videoGamesSlice.actions
export default videoGamesSlice.reducer
