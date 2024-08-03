import { FaDiscord } from 'react-icons/fa6'
import { LuPlus } from 'react-icons/lu'

const SideBar = () => {
  return (
    <section className='flex w-[80px] items-center py-2 flex-col gap-2 min-h-screen bg-sidebar_color'>
      <div className='flex flex-col gap-2 items-center'>
        <div className='side_icon hover:bg-discord_color cursor-pointer duration-300 ease-in-out bg-bg_color flex items-center justify-center'>
          <FaDiscord className='text-white text-3xl' />
        </div>
        <div className='w-[33px] bg-bg_color h-[2px]'></div>
      </div>
      <div className='flex flex-col items-start gap-3'></div>
      <div className='side_icon flex items-center justify-center cursor-pointer bg-bg_color group hover:bg-[#25a712]'>
        <LuPlus className='text-[#287E29] text-2xl group-hover:text-white !transition-none' />
      </div>
    </section>
  )
}

export default SideBar
