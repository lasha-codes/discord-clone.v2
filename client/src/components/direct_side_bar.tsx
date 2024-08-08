import { IoMan } from 'react-icons/io5'
import { LuPlus } from 'react-icons/lu'
import UserBottom from './user_bottom'

const DirectSideBar = () => {
  return (
    <div className='bg-second_bar_color h-full w-[230px] flex flex-col pt-5'>
      <div className='flex flex-col gap-5 w-full'>
        <div className='px-2'>
          <div className='w-full flex items-center justify-start gap-2.5 text-xl text-[#cacccc] hover:bg-[#fff]/10 hover:text-white py-2.5 rounded-md px-5 transition-all duration-200 cursor-pointer ease-in-out'>
            <IoMan className='text-2xl' />
            <span>Friends</span>
          </div>
        </div>
        <div className='flex items-center justify-between w-full text-[13px] text-[#b3b3b3] px-5 cursor-pointer'>
          <span>DIRECT MESSAGES</span>
          <LuPlus />
        </div>
      </div>
      <UserBottom />
    </div>
  )
}

export default DirectSideBar
