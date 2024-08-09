/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Routes, Route } from 'react-router-dom'
import MainPage from './main_page'
import LoginPage from './authentication/pages/login'
import RegisterPage from './authentication/pages/register'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { load_user_profile } from './library/slices/user'
import VerifyAccount from './authentication/pages/verify_account'
import SentVerification from './authentication/pages/sent_verification'
import io from 'socket.io-client'
import { useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const { account, loading } = useSelector((state: any) => state.user)
  const ENDPOINT = 'http://localhost:4000'

  const socket = io(ENDPOINT)

  useEffect(() => {
    dispatch(load_user_profile() as any)
  }, [])

  useEffect(() => {
    if (!loading && account) {
      socket.emit('get_user_data', { userId: account.id })
    }
  }, [loading, account])

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
