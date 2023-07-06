import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from '../Reducers/userReducer';
import { videoGamesSlice } from '../Reducers/videoGamesReducer';

const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    videoGames: videoGamesSlice.reducer,
  },
});

export default store;
