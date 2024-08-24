/* eslint-disable @typescript-eslint/no-explicit-any */
import { HiOutlinePlusSm } from 'react-icons/hi'

export type User = {
  first_user_id: string
  first_user: {
    id: string
    email: string
    password: string
    username: string
    verified: boolean
    image_url: string | null
    birth_date: string
    display_name: string
    phone_number: string | null
  }
  second_user_id: string
  second_user: {
    id: string
    email: string
    password: string
    username: string
    verified: boolean
    image_url: string | null
    birth_date: string
    display_name: string
    phone_number: string | null
  }
}

const Chat = ({ user }: { user: any }) => {
  return (
    <section className='min-w-[calc(100%-225px)] ml-auto max-w-[calc(100%-225px)] relative min-h-full flex flex-col items-center px-5 bg-gray-400/5'>
      <div className='h-full bg-transparent flex flex-col items-start gap-5'></div>

      <div className='w-[97%] absolute bottom-4 translate-x-[10px] h-[46px] rounded-lg bg-[#00000025] left-[0px] flex items-center px-4'>
        <label className='bg-[#FAFAFA]/40 p-0.5 rounded-full hover:bg-[#fafafa]/60 transition-all duration-150 cursor-pointer'>
          <HiOutlinePlusSm className='text-xl text-[#00000094]' />
        </label>
        <input
          type='text'
          placeholder={`Message @${user?.username}`}
          className='w-full h-full bg-transparent py-2 px-3 outline-none text-[#FAFAFA]/90'
        />
      </div>
    </section>
  )
}

export default Chat
