/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export type request = {
  id: string
  sender: string
  receiver: string
}

type initialState = {
  account: null | any
  requests: request[]
  loading: boolean
  requests_loading: boolean
}

const initial_state: initialState = {
  account: null,
  loading: true,
  requests: [],
  requests_loading: true,
}

export const load_user_profile = createAsyncThunk('fetch_user', async () => {
  try {
    const response = await axios.get('/auth/get_member')
    return response.data.member
  } catch (err: any) {
    console.log(err.message)
  }
})

export const fetch_pending_requests = createAsyncThunk(
  'fetch_requests',
  async () => {
    try {
      const {
        data: { requests },
      } = await axios.get('/auth/get_pending_requests')
      return requests
    } catch (err: any) {
      console.log(err.message)
    }
  }
)

const user_slice = createSlice({
  initialState: initial_state,
  name: 'user',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(load_user_profile.pending, (state) => {
      state.loading = true
    })
    builder.addCase(load_user_profile.rejected, (state) => {
      state.loading = false
      console.log('something went wrong')
    })
    builder.addCase(load_user_profile.fulfilled, (state, { payload }) => {
      state.loading = false
      state.account = payload
    })
    builder.addCase(fetch_pending_requests.pending, (state) => {
      state.requests_loading = true
    })
    builder.addCase(fetch_pending_requests.rejected, (state) => {
      state.requests_loading = false
      console.log('something went wrong')
    })

    builder.addCase(
      fetch_pending_requests.fulfilled,
      (state, { payload }: { payload: any }) => {
        state.requests_loading = false
        state.requests = payload
        console.log(state.requests)
      }
    )
  },
})

export default user_slice.reducer
