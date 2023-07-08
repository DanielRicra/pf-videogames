import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import cartReducer from './cart/cartSlice'
import videoGameReducer from './videogame/videoGameSlice'

const store = configureStore({
  reducer: {
    users: userReducer,
    cart: cartReducer,
    videoGames: videoGameReducer,
  },
})

export default store