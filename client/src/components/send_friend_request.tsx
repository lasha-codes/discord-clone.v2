import { useState } from 'react'
import wampus_no_friends from '../assets/wampus_no_friends.png'
import axios from 'axios'
import { toast } from 'sonner'
import { socket } from '../App'
import { useSelector } from 'react-redux'

const SendFriendRequest = () => {
  const { account } = useSelector((state: any) => state.user)
  const [username, setUsername] = useState<string>('')
  const [errMessage, setErrMessage] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [requestColor, setRequestColor] = useState<string>('#000')

  const sendFriendRequest = async () => {
    try {
      const {
        data: { message, error_message },
      } = await axios.post('/auth/send_friend_request', {
        receiver_username: username,
        sender_id: account.id,
      })
      if (error_message) {
        setErrMessage(error_message)
        setMessage('')
        setRequestColor('#D2042D')
      } else if (message) {
        setMessage(message)
        setErrMessage('')
        setRequestColor('#50C878')
      }
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  return (
    <div className='w-full flex flex-col items-center'>
      <div className='w-full flex flex-col items-center gap-5'>
        <div className='w-full flex flex-col gap-1.5 px-10'>
          <h3 className='text-white font-bold text-[15px]'>ADD FRIEND</h3>
          <p className='text-gray-300/70 text-sm font-medium'>
            You can add friends with their Discord usernames.
          </p>
          <div className='w-full h-[48px] rounded-lg relative overflow-y-hidden mt-2'>
            <div className='w-full flex h-full flex-col items-start gap-1'>
              <input
                type='text'
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUsername(e.target.value)
                }
                style={{
                  borderColor: requestColor,
                }}
                placeholder='You can add friends with their Discord usernames.'
                className='w-full h-full text-[17px] text-white px-4 placeholder:text-[15px] placeholder:text-gray-500/90 placeholder:font-medium bg-[#13131393] border rounded-lg outline-none'
              />
            </div>
            <button
              onClick={sendFriendRequest}
              disabled={!username}
              className='absolute z-[20] bg-discord_color disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 ease-in-out hover:bg-[#4e5ef1] right-3 top-1/2 text-white py-[6px] text-[13px] font-medium px-3 rounded -translate-y-1/2'
            >
              Send Friend Request
            </button>
          </div>
          <p
            className='text-[13px] ml-0.5'
            style={{
              color: message || errMessage,
            }}
          >
            {message || errMessage}
          </p>
        </div>
        <div className='w-full h-[1px] bg-gray-600/50' />
      </div>
      <img src={wampus_no_friends} />
    </div>
  )
}

export default SendFriendRequest
