import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cart/cartSlice'
import userReducer from './user/userSlice'
import videoGameReducer from './videogame/videoGameSlice'
import reviewReducer from './review/reviewReducer'


const store = configureStore({
  reducer: {
    cart: cartReducer,
    review: reviewReducer,
    videoGames: videoGameReducer,
    user: userReducer,
  },
})

export default store
