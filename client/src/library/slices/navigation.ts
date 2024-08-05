import { createSlice } from '@reduxjs/toolkit'

type initial_type = {
  selected_server: number | null
  direct_messages_open: boolean
  date_picker: 'month' | 'day' | 'year' | null
}

const initial_state: initial_type = {
  selected_server: null,
  direct_messages_open: false,
  date_picker: null,
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
    select_date_picker: (state, { payload }) => {
      const { date }: { date: 'month' | 'day' | 'year' } = payload
      if (state.date_picker === date) {
        state.date_picker = null
      } else {
        state.date_picker = date
      }
    },
    close_date_picker: (state) => {
      state.date_picker = null
    },
  },
})

export default navigationSlice.reducer

export const { toggle_direct_messages, select_date_picker, close_date_picker } =
  navigationSlice.actions
