import { configureStore } from '@reduxjs/toolkit'
import navigation from './slices/navigation'
import user from './slices/user'

const store = configureStore({
  reducer: {
    navigation,
    user,
  },
})

export default store
