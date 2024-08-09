import { createSlice } from '@reduxjs/toolkit'

type initial_type = {
  selected_server: number | null
  direct_messages_open: boolean
  date_picker: 'month' | 'day' | 'year' | null
  verification_sent: boolean | 'verified'
  selected_direct_nav: string | null
}

const initial_state: initial_type = {
  selected_server: null,
  direct_messages_open: false,
  date_picker: null,
  verification_sent: false,
  selected_direct_nav: null,
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
    change_verification: (state, { payload }) => {
      const { stage }: { stage: boolean | 'verified' } = payload
      if (stage === 'verified') {
        state.verification_sent = 'verified'
      } else {
        state.verification_sent = stage
      }
    },
    select_direct_nav: (state, { payload }) => {
      state.selected_direct_nav = payload.nav
    },
  },
})

export default navigationSlice.reducer

export const {
  toggle_direct_messages,
  select_date_picker,
  close_date_picker,
  change_verification,
  select_direct_nav,
} = navigationSlice.actions
