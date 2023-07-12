import { createSlice } from '@reduxjs/toolkit'
import { getCartItemsFromStorage } from '../../utils/localStorageHelper'

const initialState = {
  cartItems: getCartItemsFromStorage(),
  loadingCheckoutStatus: false,
  urlCheckout: '',
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let videogame = {
        id: action.payload.id,
        name: action.payload.name,
        description: action.payload.description.slice(0, 50),
        image: action.payload.image,
        price: action.payload.price,
      }
      state.cartItems.push(videogame)
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      )
    },
    setLoadingCheckoutStatus: (state, action) => {
      state.loadingCheckoutStatus = action.payload
    },
    setUrlCheckout: (state, action) => {
      state.urlCheckout = action.payload
    },
    cleanCart: (state) => {
      state.cartItems = []
    },
  },
})

export const getCartItems = (state) => state.cart.cartItems

export const {
  addToCart,
  removeFromCart,
  cleanCart,
  setLoadingCheckoutStatus,
  setUrlCheckout,
} = cartSlice.actions
export default cartSlice.reducer
