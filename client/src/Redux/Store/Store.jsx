import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from '../Reducers/userReducer'


const store = configureStore({
    reducer: {
        users: userSlice.reducer,
    },
})

export default store