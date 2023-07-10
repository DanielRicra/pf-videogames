import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  videoGames: [],
  detail: {},
  genresFilter: [],
  tagsFilter: [],
  videoLoading: false,
  videoError: false,
  searchQuery: '',
  sortType: '',
  sortOrder: '',
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
    // clearCurrentVideogame: (state, action) => {
    //   state.detail = action.payload
    // },
    
    setGenreFilter: (state, action) => {
      state.genresFilter = action.payload
    },
    setTagFilter: (state, action) => {
      state.tagsFilter = action.payload
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },

    setSortType: (state, action) => {
      state.sortType = action.payload
    },

    setSortOrder: (state, action) => {
      state.sortOrder = action.payload
    },
  },
})

export const getSearchQuery = (state) => state.videoGames.searchQuery
export const getVideoGames = (state) => state.videoGames.videoGames

export const getSortType = (state) => state.videoGames.sortType
export const getSortOrder = (state) => state.videoGames.sortOrder

export const {
  setVideoGames,
  setLoading,
  setError,
  currentVideogame,
  // clearCurrentVideogame,
  setSearchQuery,
  setTagFilter,
  setGenreFilter,
  setSortType,
  setSortOrder,
} = videoGamesSlice.actions
export default videoGamesSlice.reducer
