import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import cartReducer from './cart/cartSlice'
import videoGameReducer from './videogame/videoGameSlice'
import reviewReducer from './review/reviewReducer'


const store = configureStore({
  reducer: {
    users: userReducer,
    cart: cartReducer,
    review: reviewReducer,
    videoGames: videoGameReducer,

  },
})

export default store
