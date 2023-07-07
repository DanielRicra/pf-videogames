import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import cartReducer from './cart/cartSlice'
import videoGameReducer from './videogame/videoGameSlice'
import reviewReducer from './Reducers/reviewReducer';

const store = configureStore({
  reducer: {
    users: userReducer,
    cart: cartReducer,
    videoGame: videoGameReducer,
    review: reviewReducer,
  },
})

export default store