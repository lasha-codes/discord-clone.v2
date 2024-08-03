import { createSlice } from '@reduxjs/toolkit'

const initial_state = {
  selected_navigations: [],
}

const navigationSlice = createSlice({
  name: 'navigation_slice',
  initialState: initial_state,
  reducers: {},
})

export default navigationSlice.reducer
