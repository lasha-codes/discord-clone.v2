import login_bg from '../assets/login_bg.webp'
import discord_logo from '../assets/discord_logo.svg'
import LoginForm from '../components/login_form'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate()
  const { loading, account } = useSelector((state: any) => state.user)

  useEffect(() => {
    if (!loading && account) {
      return navigate('/')
    }
  }, [loading])

  return (
    <main className='h-[100vh] relative'>
      <img src={login_bg} className='absolute w-full h-full object-cover' />
      <img
        src={discord_logo}
        className='absolute z-20 w-[130px] top-9 left-10'
      />
      <LoginForm />
    </main>
  )
}

export default LoginPage
