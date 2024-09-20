/* eslint-disable @typescript-eslint/no-explicit-any */
import DirectSideBar from './direct_side_bar'
import DirectTopBar from './direct_top_bar'
import { useSelector } from 'react-redux'
import SendFriendRequest from './send_friend_request'
import PendingRequests from './pending_requests'
import Chat, { User } from './chat'

const SideScreen = () => {
  const { selected_direct_nav }: { selected_direct_nav: string } = useSelector(
    (state: any) => state.navigation
  )
  const { selected_friend }: { selected_friend: User } = useSelector(
    (state: any) => state.user
  )

  console.log(selected_friend)
  return (
    <section className='w-full flex items-start relative overflow-hidden h-[96.5vh] bg-bg_color mt-auto rounded-tl-[9px]'>
      <div className='flex items-start h-full min-w-full'>
        <DirectSideBar />
        {selected_friend && <Chat user={selected_friend} />}
        <div className='mt-[75px] w-full'>
          {selected_direct_nav === 'add_friend' && <SendFriendRequest />}
          {selected_direct_nav === 'Pending' && <PendingRequests />}
        </div>
      </div>
      <DirectTopBar />
    </section>
  )
}

console.log('have to sleep')

export default SideScreen
