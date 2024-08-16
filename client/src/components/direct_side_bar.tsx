import { LuPlus } from 'react-icons/lu'
import UserBottom from './user_bottom'
import friends_icon from '../assets/friends_icon.png'
import Friends from './friends'

const DirectSideBar = () => {
  return (
    <div className='bg-second_bar_color h-full min-w-[230px] flex flex-col pt-16'>
      <div className='flex flex-col gap-5 w-full'>
        <div className='px-2'>
          <div className='w-full flex items-center justify-start gap-2.5 text-xl text-[#cacccc] hover:bg-gray-300/5 hover:text-white py-1.5 rounded-md px-5 transition-all duration-200 cursor-pointer ease-in-out'>
            <img
              src={friends_icon}
              className='w-[35px] h-[35px] object-contain'
            />
            <span className='text-[#FFFEFF]'>Friends</span>
          </div>
        </div>
        <div className='flex items-center justify-between w-full text-[13px] text-[#b3b3b3] px-5 cursor-pointer'>
          <span>DIRECT MESSAGES</span>
          <LuPlus />
        </div>
        <Friends />
      </div>
      <UserBottom />
    </div>
  )
}

export default DirectSideBar
