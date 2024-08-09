import friends_icon from '../assets/friends_icon.png'
import { TbMessageCirclePlus } from 'react-icons/tb'

const navigation = ['Online', 'All', 'Pending', 'Blocked']

const DirectTopBar = () => {
  return (
    <div className='absolute top-0 pt-2 pb-2.5 w-full border-b bg-transparent border-[#1f1f1f] flex px-2 items-center justify-between shadow-sm shadow-black/10'>
      <div className='flex items-center gap-6'>
        <div className='text-[13px] bg-[#1f1f1f] text-gray-400 cursor-pointer px-2 w-[210px] py-[5px] rounded-[6px]'>
          Find or start a conversation
        </div>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-1 font-medium text-white text-[15px]'>
            <img src={friends_icon} className='w-[36px] object-contain' />
            Friends
          </div>
          <div className='h-[20px] w-[1px] bg-gray-500' />
          {navigation.map((nav: string, idx: number) => {
            return (
              <div
                key={idx}
                className='text-gray-400 font-medium px-1.5 text-sm transition-all duration-100 ease-out py-0.5 cursor-pointer rounded-md hover:bg-gray-300/5 hover:text-gray-300'
              >
                {nav}
              </div>
            )
          })}
        </div>
      </div>
      <TbMessageCirclePlus className='text-gray-400 text-xl cursor-pointer mr-3 hover:text-gray-300 transition-all duration-100 ease-in-out' />
    </div>
  )
}

export default DirectTopBar
