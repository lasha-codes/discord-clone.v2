import { Routes, Route } from 'react-router-dom'
import MainPage from './main_page'
import LoginPage from './authentication/pages/login'
import RegisterPage from './authentication/pages/register'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
    </Routes>
  )
}

export default App
