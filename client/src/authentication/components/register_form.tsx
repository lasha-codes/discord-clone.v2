import { Link } from 'react-router-dom'
import { useState } from 'react'

const RegisterForm = () => {
  const [email_phone, setEmail_Phone] = useState<string | number>('')
  const [password, setPassword] = useState<string>('')

  return (
    <div className='bg-[#313338] rounded-md px-7 py-6 z-[50] absolute w-[500px] top-1/3 flex left-1/2 translate-x-[-50%] flex-col items-center gap-4'>
      <div className='flex flex-col items-center gap-2'>
        <h3 className='font-medium text-2xl text-white'>Welcome back!</h3>
        <p className='text-[#969BA1]'>We're so excited to see you again!</p>
      </div>
      <form className='w-full flex flex-col gap-4'>
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
            className='outline-none bg-[#1E1F22] px-3 py-1.5 rounded-[4px] w-full text-white'
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
              className='outline-none bg-[#1E1F22] px-3 py-1.5 rounded-[4px] w-full text-white'
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm
