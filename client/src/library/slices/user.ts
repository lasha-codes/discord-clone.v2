/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

type initialState = {
  account: null | any
  requests: any[]
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
  reducers: {
    add_request: (state, { payload }) => {
      if (state.account.id === payload.request.sender_id) {
        if (state.requests[0].sent) {
          state.requests[0].sent.push(payload.request)
        } else {
          state.requests[0].sent = payload.request
        }
      } else {
        if (state.requests[1].received) {
          state.requests[1].received.push(payload.request)
        } else {
          state.requests[1].received = payload.request
        }
      }
    },
    remove_request: (state, { payload }) => {
      const { member, deleteId }: { member: string; deleteId: string } = payload
      if (member === 'sender') {
        let sent_requests = state.requests[0].sent
        sent_requests = sent_requests.filter((request: any) => {
          return request.id !== deleteId
        })
        state.requests[0].sent = sent_requests
      } else {
        let received_requests = state.requests[1].received
        received_requests = received_requests.filter((request: any) => {
          return request.id !== deleteId
        })
        state.requests[1].received = received_requests
      }
    },
  },
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
export const { add_request, remove_request } = user_slice.actions
