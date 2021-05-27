import { configureStore } from '@reduxjs/toolkit'

import weathersReducer from '../features/weathers/weathersSlice'

export default configureStore({
    reducer: {
        weathers: weathersReducer
    }
})