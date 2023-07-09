import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import cartReducer from './cart/cartSlice'
import videoGamesReducer from './videogame/videoGameSlice'

const store = configureStore({
  reducer: {
    users: userReducer,
    cart: cartReducer,
    videoGames: videoGamesReducer,
  },
})

export default store
