import login_bg from '../assets/login_bg.webp'
import discord_logo from '../assets/discord_logo.svg'
import RegisterForm from '../components/register_form'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
  const navigate = useNavigate()
  const { loading, account } = useSelector((state: any) => state.user)
  const { verification_sent } = useSelector((state: any) => state.navigation)

  useEffect(() => {
    if (!loading && account) {
      if (verification_sent === false || verification_sent === 'verified') {
        return navigate('/')
      }
    }
  }, [verification_sent, loading])

  return (
    <main className='h-[100vh] relative'>
      <img src={login_bg} className='absolute w-full h-full object-cover' />
      <img
        src={discord_logo}
        className='absolute z-20 w-[130px] top-9 left-10'
      />
      <RegisterForm />
    </main>
  )
}

export default RegisterPage
