import discord_logo from '../assets/discord_logo.svg'
import login_bg from '../assets/login_bg.webp'
import SendVerification from '../components/send_verification'

const SentVerification = () => {
  return (
    <main className='h-[100vh] relative flex items-center justify-center'>
      <img src={login_bg} className='absolute w-full h-full object-cover' />
      <img
        src={discord_logo}
        className='absolute z-20 w-[130px] top-9 left-10'
      />
      <SendVerification />
    </main>
  )
}
export default SentVerification
