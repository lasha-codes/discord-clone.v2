import { Link } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'sonner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { load_user_profile } from '../../library/slices/user'
import { useDispatch } from 'react-redux'

const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email_phone, setEmail_Phone] = useState<string | number>('')
  const [password, setPassword] = useState<string>('')

  const loginUser = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (!email_phone) {
        toast.warning(
          'Please provider an email or phone number for ur account.'
        )
      }
      if (!password) {
        toast.warning('Please provider a password for your account')
      }
      if (!password || !email_phone) return

      const response = await axios.post('/auth/login', {
        email: email_phone,
        password,
      })

      if (response.data.message) {
        return toast.error(response.data.message)
      }

      setEmail_Phone('')
      setPassword('')
      dispatch(load_user_profile() as any)

      if (response.data.member) {
        return navigate('/')
      }
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  return (
    <div className='bg-[#313338] rounded-md px-8 py-10 z-[50] absolute w-[500px] top-1/4 flex left-1/2 translate-x-[-50%] flex-col items-center gap-4'>
      <div className='flex flex-col items-center gap-2'>
        <h3 className='font-medium text-2xl text-white'>Welcome back!</h3>
        <p className='text-[#969BA1]'>We're so excited to see you again!</p>
      </div>
      <form onSubmit={loginUser} className='w-full flex flex-col gap-4'>
        <div className='flex flex-col items-start gap-1.5 w-full'>
          <label
            htmlFor='email_phone'
            className='text-[12px] text-[#B1B5BC] font-extrabold flex items-start gap-1'
          >
            EMAIL OR PHONE NUMBER{' '}
            <span className='text-[8px] text-red-500'>*</span>
          </label>
          <input
            value={email_phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail_Phone(e.target.value)
            }
            type='text'
            id='email_phone'
            className='outline-none bg-[#1E1F22] px-3 py-2 rounded-[4px] w-full text-white'
          />
        </div>
        <div className='flex flex-col items-start gap-1'>
          <div className='flex flex-col items-start gap-1.5 w-full'>
            <label
              htmlFor='password'
              className='text-[12px] text-[#B1B5BC] font-extrabold flex items-start gap-1'
            >
              PASSWORD <span className='text-[8px] text-red-500'>*</span>
            </label>
            <input
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              type='password'
              id='password'
              className='outline-none bg-[#1E1F22] px-3 py-2 rounded-[4px] w-full text-white'
            />
          </div>
          <span className='text-[#00A8FC] text-sm hover:underline mt-1 cursor-pointer'>
            Forgot your password?
          </span>
        </div>
        <div className='flex flex-col items-start gap-2'>
          <button
            type='submit'
            className='w-full bg-[#5865F2] mt-3 text-white py-2.5 rounded font-medium hover:bg-[#3f4dec] transition-all duration-150 ease-linear'
          >
            Log In
          </button>
          <p className='text-gray-400 text-sm flex items-center gap-1 mt-1'>
            Need an account?
            <Link to={'/register'} className='text-[#00A8FC] hover:underline'>
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
