import login_bg from '../assets/login_bg.webp'
import discord_logo from '../assets/discord_logo.svg'
import RegisterForm from '../components/register_form'

const RegisterPage = () => {
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
