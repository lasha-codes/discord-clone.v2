import { useSelector } from 'react-redux'
import default_avatar from '../assets/default_avatar.png'
import { IoCloseOutline } from 'react-icons/io5'

const Friends = () => {
  const { friends } = useSelector((state: any) => state.user)
  return (
    <div className='flex flex-col items-start px-2'>
      {friends.friendsAsFirst.map((friend: any, idx: number) => {
        return (
          <div
            key={idx}
            className='w-full rounded-lg transition-all duration-[100ms] group hover:bg-gray-500/10 py-1.5 cursor-pointer flex items-center justify-between px-3'
          >
            <div className='flex items-center gap-2.5'>
              <div className='h-[35px] w-[35px] rounded-full overflow-hidden'>
                <img src={friend.second_user.image_url || default_avatar} />
              </div>
              <h5 className='font-medium group-hover:text-white text-gray-400 text-[15px]'>
                {friend.second_user.username}
              </h5>
            </div>
            <IoCloseOutline className='opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto text-gray-400 text-lg' />
          </div>
        )
      })}
      {friends.friendsAsSecond.map((friend: any, idx: number) => {
        return (
          <div
            key={idx}
            className='w-full rounded-lg transition-all duration-[100ms] group hover:bg-gray-500/10 py-1.5 cursor-pointer flex items-center justify-between px-3'
          >
            <div className='flex items-center gap-2.5'>
              <div className='h-[35px] w-[35px] rounded-full overflow-hidden'>
                <img src={friend.first_user.image_url || default_avatar} />
              </div>
              <h5 className='font-medium group-hover:text-white text-gray-400 text-[15px]'>
                {friend.first_user.username}
              </h5>
            </div>
            <IoCloseOutline className='opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto text-gray-400 text-lg' />
          </div>
        )
      })}
    </div>
  )
}

export default Friends
