import { configureStore } from '@reduxjs/toolkit'
import navigation from './slices/navigation'

const store = configureStore({
  reducer: {
    navigation,
  },
})

export default store
