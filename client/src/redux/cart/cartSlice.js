import { createSlice } from '@reduxjs/toolkit'
import { getCartItemsFromStorage } from '../../utils/localStorageHelper'

const initialState = {
  cartItems: getCartItemsFromStorage(),
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload)
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload)
    },
    cleanCart: (state) => {
      state.cartItems = []
    },
  },
})

export const getCartItems = (state) => state.cart.cartItems

export const { addToCart, removeFromCart, cleanCart } =
  cartSlice.actions
export default cartSlice.reducer
