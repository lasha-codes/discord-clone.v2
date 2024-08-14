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
    dispatch(load_user_profile() as any)
    dispatch(fetch_pending_requests() as any)
  }, [])

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

    socket.on('push_request', handlePushRequest)

    return () => {
      socket.off('push_request', handlePushRequest)
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
