import { useState } from 'react'
import wampus_no_friends from '../assets/wampus_no_friends.png'

const SendFriendRequest = () => {
  const [username, setUsername] = useState<string>('')

  return (
    <div className='w-full flex flex-col items-center'>
      <div className='w-full flex flex-col items-center gap-5'>
        <div className='w-full flex flex-col gap-1.5 px-10'>
          <h3 className='text-white font-bold text-[15px]'>ADD FRIEND</h3>
          <p className='text-gray-300/70 text-sm font-medium'>
            You can add friends with their Discord usernames.
          </p>
          <div className='w-full h-[48px] rounded-lg relative overflow-y-hidden mt-2'>
            <input
              type='text'
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
              placeholder='You can add friends with their Discord usernames.'
              className='w-full h-full text-[17px] text-white px-4 placeholder:text-[15px] placeholder:text-gray-500/90 placeholder:font-medium bg-[#13131393] border border-black rounded-lg outline-none'
            />
            <button className='absolute z-[20] bg-discord_color transition-all duration-200 ease-in-out hover:bg-[#4e5ef1] right-3 top-1/2 text-white py-[5px] text-[13px] font-medium px-3 rounded -translate-y-1/2'>
              Send Friend Request
            </button>
          </div>
        </div>
        <div className='w-full h-[1px] bg-gray-600/50' />
      </div>
      <img src={wampus_no_friends} />
    </div>
  )
}

export default SendFriendRequest
