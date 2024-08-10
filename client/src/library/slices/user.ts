/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

type request = {
  id: string
  sender: string
  receiver: string
}

type initialState = {
  account: null | any
  requests: request[]
  loading: boolean
}

const initial_state: initialState = {
  account: null,
  loading: true,
  requests: [],
}

export const load_user_profile = createAsyncThunk('fetch_user', async () => {
  try {
    const response = await axios.get('/auth/get_member')
    return response.data.member
  } catch (err: any) {
    console.log(err.message)
  }
})

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
    builder.addCase(load_user_profile.fulfilled, (state, payload) => {
      state.loading = false
      state.account = payload.payload
    })
  },
})

export default user_slice.reducer
