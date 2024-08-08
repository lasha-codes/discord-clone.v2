import login_bg from '../assets/login_bg.webp'
import discord_logo from '../assets/discord_logo.svg'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import verified from '../assets/verified.png'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { load_user_profile } from '../../library/slices/user'

const VerifyAccount = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()
  const [loaded, setLoaded] = useState<boolean>(false)
  const [notAllowed, setNotAllowed] = useState<boolean>(false)

  useEffect(() => {
    setLoaded(true)

    const verifyToken = async () => {
      const response = await axios.get('/auth/get_token')
      if (!response.data.token) {
        setNotAllowed(true)
        return navigate('/')
      } else {
        await axios.get(`/auth/${params.userId}/verify/${params.token}`)
        dispatch(load_user_profile() as any)
      }
    }
    verifyToken()
  }, [loaded])

  if (notAllowed) {
    return '404 Not Found'
  }

  return (
    <main className='h-[100vh] relative flex items-center justify-center'>
      <img src={login_bg} className='absolute w-full h-full object-cover' />
      <img
        src={discord_logo}
        className='absolute z-20 w-[130px] top-9 left-10'
      />
      <div className='z-[99] bg-[#313338] w-[400px] py-8 px-10 rounded-xl shadow-sm shadow-gray-800'>
        <div className='flex flex-col items-center gap-3'>
          <img
            src={verified}
            className='w-full object-contain'
            alt='verify image'
          />
          <p className='text-white text-xl font-medium.'>
            Your account has been verified!
          </p>
          <Link
            to={'/'}
            className='w-full bg-[#5865F2] mt-3 text-white py-2.5 rounded font-medium hover:bg-[#3f4dec] transition-all duration-150 ease-linear text-center'
          >
            Go to dashboard
          </Link>
        </div>
      </div>
    </main>
  )
}

export default VerifyAccount
