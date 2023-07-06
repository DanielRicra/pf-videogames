import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import cartReducer from './cart/cartSlice'

const store = configureStore({
  reducer: {
    users: userReducer,
    cart: cartReducer,
  },
})

export default store
