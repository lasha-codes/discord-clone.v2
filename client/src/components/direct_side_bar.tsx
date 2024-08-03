import { IoMan } from 'react-icons/io5'
import { LuPlus } from 'react-icons/lu'

const DirectSideBar = () => {
  return (
    <div className='bg-second_bar_color h-full w-[230px] flex flex-col px-2 py-5'>
      <div className='flex flex-col gap-5 w-full'>
        <div className='w-full flex items-center justify-start gap-2.5 text-xl text-[#cacccc] hover:bg-[#2525253f]/20 hover:text-white py-2.5 rounded-md px-3 transition-all duration-200 cursor-pointer'>
          <IoMan className='text-2xl' />
          <span>Friends</span>
        </div>
        <div className='flex items-center justify-between w-full text-[13px] text-[#b3b3b3] px-3 cursor-pointer'>
          <span>DIRECT MESSAGES</span>
          <LuPlus />
        </div>
      </div>
    </div>
  )
}

export default DirectSideBar
