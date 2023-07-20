import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getUser } from '../../services/userService'
import { getPendingFriendRequests } from '../../services/friendService';
import { AxiosError } from 'axios'

const initialState = {
  user: {},
  error: null,
  loading: 'idle',
}

export const fetchUserByEmail = createAsyncThunk(
  'user/fetchUserByEmail',
  async (email, { rejectWithValue }) => {
    try {
      const userData = await getUser(email)
      const pendingFriendRequests = await getPendingFriendRequests(email) 
      console.log('User Data:', userData)
      console.log('Pending Friend Requests:', pendingFriendRequests)
      return {
        ...userData,
        pendingFriendRequests,
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error.response?.data?.error ?? 'Something went wrong'
        );
      }
      return rejectWithValue(error.message)
    }
  }
)

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
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

export const { setUser, setLoading, setError } = userSlice.actions
export default userSlice.reducer
