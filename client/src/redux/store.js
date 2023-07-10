import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cart/cartSlice'
import videoGameReducer from './videogame/videoGameSlice'
import reviewReducer from './review/reviewReducer'


const store = configureStore({
  reducer: {
    cart: cartReducer,
    review: reviewReducer,
    videoGames: videoGameReducer,
  },
})

export default store
