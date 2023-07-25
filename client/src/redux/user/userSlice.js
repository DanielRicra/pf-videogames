import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getUser } from '../../services/userService'
import { AxiosError } from 'axios'

const initialState = {
  user: {},
  error: null,
  loading: 'idle',
  favorites: [],
}

export const fetchUserByEmail = createAsyncThunk(
  'user/fetchUserByEmail',
  async (email, { rejectWithValue }) => {
    try {
      const userData = await getUser(email)
      return userData
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error.response?.data?.error ?? 'Something went wrong'
        )
      }
      return rejectWithValue(error.message)
    }
  }
)

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setFavorites: (state, action) => {
      state.favorites = action.payload
    },
    addToFavorites: (state, action) => {
      state.favorites.push(action.payload)
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(
        (fav) => fav.id !== action.payload
      )
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserByEmail.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(fetchUserByEmail.fulfilled, (state, action) => {
        state.loading = 'success'
        state.user = action.payload
      })
      .addCase(fetchUserByEmail.rejected, (state, action) => {
        state.loading = 'idle'
        state.error = action.payload
      })
  },
})

export const selectUser = (state) => state.user.user
export const selectFavorites = (state) => state.user.favorites

export const {
  setUser,
  setLoading,
  setError,
  updateUser,
  setFavorites,
  removeFromFavorites,
  addToFavorites,
} = userSlice.actions
export default userSlice.reducer
