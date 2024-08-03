/* eslint-disable @typescript-eslint/no-explicit-any */

import { FaDiscord } from 'react-icons/fa6'
import { LuPlus } from 'react-icons/lu'
import { toggle_direct_messages } from '../library/slices/navigation'
import { useDispatch, useSelector } from 'react-redux'

const SideBar = () => {
  const dispatch = useDispatch()
  const { direct_messages_open } = useSelector((state: any) => state.navigation)
  return (
    <div className='flex w-[80px] items-center py-2 flex-col gap-2 min-h-screen bg-sidebar_color'>
      <div className='flex flex-col gap-2 items-center'>
        <div className='flex flex-col items-start'>
          <h4 className='title_icon font-extrabold text-[13px] text-[#bcbec0] mb-2'>
            Discord
          </h4>
          <div
            onClick={() => dispatch(toggle_direct_messages({ bool: true }))}
            className={`side_icon hover:bg-discord_color cursor-pointer duration-300 ease-in-out bg-bg_color flex items-center justify-center ${
              direct_messages_open && 'bg-discord_color !rounded-[20px]'
            }`}
          >
            <FaDiscord className='text-white text-3xl' />
          </div>
        </div>
        <div className='w-[33px] bg-bg_color h-[2px]'></div>
      </div>
      <div className='flex flex-col items-start gap-3'></div>
      <div className='side_icon flex items-center justify-center cursor-pointer bg-bg_color group hover:bg-[#25a712]'>
        <LuPlus className='text-[#287E29] text-2xl group-hover:text-white !transition-none' />
      </div>
    </div>
  )
}

export default SideBar
