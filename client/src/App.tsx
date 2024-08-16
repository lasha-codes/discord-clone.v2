/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Routes, Route } from 'react-router-dom'
import MainPage from './main_page'
import LoginPage from './authentication/pages/login'
import RegisterPage from './authentication/pages/register'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  load_user_profile,
  fetch_pending_requests,
  add_request,
  remove_request,
  fetch_friends,
  add_friend,
} from './library/slices/user'
import VerifyAccount from './authentication/pages/verify_account'
import SentVerification from './authentication/pages/sent_verification'
import io from 'socket.io-client'
import { useSelector } from 'react-redux'

const ENDPOINT = 'http://localhost:4000'
export const socket = io(ENDPOINT)

const App = () => {
  const dispatch = useDispatch()
  const { account, loading } = useSelector((state: any) => state.user)

  useEffect(() => {
    if (!account) {
      dispatch(load_user_profile() as any)
      dispatch(fetch_pending_requests() as any)
      dispatch(fetch_friends() as any)
    }
  }, [account, loading])

  useEffect(() => {
    if (!loading && account) {
      socket.emit('get_user_data', { userId: account.id })
    }
  }, [loading, account, socket])

  useEffect(() => {
    const handlePushRequest = ({ request }: { request: any }) => {
      dispatch(add_request({ request }))
      console.log(request)
    }

    const handleRemoveRequest = ({
      deleteId,
      member,
    }: {
      deleteId: string
      member: string
    }) => {
      dispatch(remove_request({ deleteId, member }))
      console.log('something')
    }

    const handleAddFriend = ({
      new_friends,
      requestId,
    }: {
      new_friends: any
      requestId: string
    }) => {
      dispatch(add_friend({ new_friends, friendAs: 'first', requestId }))
    }

    socket.on('push_request', handlePushRequest)
    socket.on('return_delete_request', handleRemoveRequest)
    socket.on('return_accept_request', handleAddFriend)
    return () => {
      socket.off('push_request', handlePushRequest)
      socket.off('return_delete_request', handlePushRequest)
      socket.off('return_accept_request', handleAddFriend)
    }
  }, [socket])

  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/users/:userId/verify/:token' element={<VerifyAccount />} />
      <Route path='/send_email_verification' element={<SentVerification />} />
    </Routes>
  )
}

export default App
