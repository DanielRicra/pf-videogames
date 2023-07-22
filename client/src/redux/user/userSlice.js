import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getUser } from '../../services/userService'
import { getPendingFriendRequests } from '../../services/friendService'
import { AxiosError } from 'axios'

const initialState = {
  user: {},
  error: null,
  loading: 'idle',
  pendingFriendRequests: [],
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

export const fetchUserPendingFriendRequests = createAsyncThunk(
  'user/fetchUserPendingFriendRequests',
  async (email, { rejectWithValue }) => {
    try {
      const pendingFriendRequests = await getPendingFriendRequests(email)
      return pendingFriendRequests
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
      .addCase(fetchUserPendingFriendRequests.fulfilled, (state, action) => {
        state.pendingFriendRequests = action.payload
      })
  },
})

export const selectUser = (state) => state.user.user
export const selectUserPendingFriendRequests = (state) => state.user.pendingFriendRequests

export const { setUser, setLoading, setError, updateUser } = userSlice.actions
export default userSlice.reducer
