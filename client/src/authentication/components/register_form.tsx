import { Link } from 'react-router-dom'
import { useState } from 'react'

const RegisterForm = () => {
  const [email, setEmail] = useState<string | number>('')
  const [password, setPassword] = useState<string>('')
  const [nickname, setNickname] = useState<string>('')
  const [username, setUsername] = useState<string>('')

  return (
    <div className='bg-[#313338] rounded-md px-7 py-6 z-[50] absolute w-[500px] top-1/4 flex left-1/2 translate-x-[-50%] flex-col items-center gap-4'>
      <div className='flex flex-col items-center gap-2'>
        <h3 className='font-medium text-2xl text-white'>Create an account</h3>
      </div>
      <form className='w-full flex flex-col gap-4'>
        <div className='flex flex-col items-start gap-1.5 w-full'>
          <label
            htmlFor='email_phone'
            className='text-[12px] text-[#B1B5BC] font-extrabold flex items-start gap-1'
          >
            EMAIL
            <span className='text-[8px] text-red-500'>*</span>
          </label>
          <input
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            type='email'
            id='email_phone'
            className='outline-none bg-[#1E1F22] px-3 py-2 rounded-[4px] w-full text-white'
          />
        </div>

        <div className='flex flex-col items-start gap-1.5 w-full'>
          <label
            htmlFor='nickname'
            className='text-[12px] text-[#B1B5BC] font-extrabold flex items-start gap-1'
          >
            DISPLAY NAME
          </label>
          <input
            value={nickname}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNickname(e.target.value)
            }
            type='text'
            id='nickname'
            className='outline-none bg-[#1E1F22] px-3 py-2 rounded-[4px] w-full text-white'
          />
        </div>

        <div className='flex flex-col items-start gap-1.5 w-full'>
          <label
            htmlFor='username'
            className='text-[12px] text-[#B1B5BC] font-extrabold flex items-start gap-1'
          >
            USERNAME <span className='text-[8px] text-red-500'>*</span>
          </label>
          <input
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            type='text'
            id='username'
            className='outline-none bg-[#1E1F22] px-3 py-2 rounded-[4px] w-full text-white'
          />
        </div>

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
        <div className='flex flex-col items-start gap-3'>
          <button className='w-full bg-[#5865F2] mt-3 text-white py-2.5 rounded font-medium hover:bg-[#3f4dec] transition-all duration-150 ease-linear'>
            Continue
          </button>
          <Link to='/login' className='text-[#00A8FC] hover:underline text-sm'>
            Already have an account?
          </Link>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm
