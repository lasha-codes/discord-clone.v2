/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Routes, Route } from 'react-router-dom'
import MainPage from './main_page'
import LoginPage from './authentication/pages/login'
import RegisterPage from './authentication/pages/register'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { load_user_profile } from './library/slices/user'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(load_user_profile() as any)
  }, [])

  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
    </Routes>
  )
}

export default App
