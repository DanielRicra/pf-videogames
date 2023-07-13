import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getCartItemsFromStorage } from '../../utils/localStorageHelper'
import {
  addVideogamesToUserCart,
  getCartByUserEmail,
} from '../../services/cartService'
import { AxiosError } from 'axios'

const initialState = {
  cartItems: getCartItemsFromStorage(),
  loadingCheckoutStatus: false,
  urlCheckout: '',
  checkoutError: '',
}

export const fetchCartByUserEmail = createAsyncThunk(
  'users/fetchByIdStatus',
  async (userEmail, { rejectWithValue, getState }) => {
    try {
      await addVideogamesToUserCart({
        userEmail,
        videogameIds: getState().cart.cartItems.map((item) => item.id),
      })
      const data = await getCartByUserEmail(userEmail)
      return data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error.response?.data?.error ?? 'Something when wrong'
        )
      }
      return rejectWithValue(error.message)
    }
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (state.cartItems.find((item) => item.id === action.payload.id)) return
      state.cartItems.push(action.payload)
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      )
    },
    cleanCart: (state) => {
      state.cartItems = []
    },
    setLoadingCheckoutStatus: (state, action) => {
      state.loadingCheckoutStatus = action.payload
    },
    setUrlCheckout: (state, action) => {
      state.urlCheckout = action.payload
    },
    setCheckoutError: (state, action) => {
      state.loadingCheckoutStatus = false
      state.checkoutError = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartByUserEmail.fulfilled, (state, action) => {
      const data = action.payload.videogames ?? []
      const filteredData = data.filter(
        (item) => !state.cartItems.some((i) => i.id === item.id)
      )
      state.cartItems.push(...filteredData)
    })
  },
})

export const getCartItems = (state) => state.cart.cartItems

export const {
  addToCart,
  removeFromCart,
  cleanCart,
  setLoadingCheckoutStatus,
  setUrlCheckout,
  setCheckoutError,
} = cartSlice.actions
export default cartSlice.reducer
