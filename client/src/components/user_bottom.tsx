import { useSelector } from 'react-redux'
import default_avatar from '../assets/default_avatar.png'
import { FaMicrophone, FaHeadphones } from 'react-icons/fa'

const UserBottom = () => {
  const { account } = useSelector((state: any) => state.user)
  const avatar = account?.image_url || default_avatar
  return (
    <div className='w-full bg-[#292b2f] py-3 px-4 mt-auto flex items-center justify-between'>
      <div className='flex items-center gap-1.5'>
        <div className='w-[35px] h-[35px] rounded-full overflow-hidden'>
          <img src={avatar} />
        </div>
        <div className='flex flex-col items-start'>
          <h5 className='text-white text-[12px] font-bold -translate-y-[-2px]'>
            {account?.username}
          </h5>
          <span className='text-[10px] text-gray-400'>Online</span>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <FaMicrophone className='text-lg text-gray-500 cursor-pointer' />
        <FaHeadphones className='text-lg text-gray-500 cursor-pointer' />
      </div>
    </div>
  )
}

export default UserBottom
