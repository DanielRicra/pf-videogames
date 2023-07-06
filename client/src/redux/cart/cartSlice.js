import { createSlice } from '@reduxjs/toolkit'
import { getCartProducts } from '../../utils/localStorageHelper'

const initialState = {
  cartProducts: getCartProducts(),
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { payload } = action

      if (
        state.cartProducts.find(
          (cp) => cp.product.id === payload.product.id
        ) === undefined
      ) {
        state.cartProducts.push(payload)
      } else {
        state.cartProducts.map((cp) => {
          if (cp.product.id === payload.product.id) {
            return { ...cp, quantity: cp.quantity + payload.quantity }
          }
          return cp
        })
      }
    },
    updateQuantityFromCart: (state, action) => {
      const { id, quantity } = action.payload

      if (quantity === 0) {
        state.cartProducts.filter((cp) => cp.product.id !== id)
      } else {
        state.cartProducts.map((cp) => {
          if (cp.product.id === id) {
            return { ...cp, quantity }
          }
          return cp
        })
      }
    },
    cleanCart: (state) => {
      state.cartProducts = []
    },
  },
})

export const { addToCart, updateQuantityFromCart, cleanCart } =
  cartSlice.actions
export default cartSlice.reducer
