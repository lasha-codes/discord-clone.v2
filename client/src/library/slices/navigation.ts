import { createSlice } from '@reduxjs/toolkit'

type initial_type = {
  selected_server: number | null
  direct_messages_open: boolean
}

const initial_state: initial_type = {
  selected_server: null,
  direct_messages_open: false,
}

const navigationSlice = createSlice({
  name: 'navigation_slice',
  initialState: initial_state,
  reducers: {
    toggle_direct_messages: (
      state,
      { payload: { bool } }: { payload: { bool: boolean } }
    ) => {
      state.direct_messages_open = bool
    },
  },
})

export default navigationSlice.reducer

export const { toggle_direct_messages } = navigationSlice.actions
