/* eslint-disable @typescript-eslint/no-explicit-any */
import DirectSideBar from './direct_side_bar'
import DirectTopBar from './direct_top_bar'
import { useSelector } from 'react-redux'
import SendFriendRequest from './send_friend_request'
import PendingRequests from './pending_requests'
import Chat from './chat'

const SideScreen = () => {
  const { selected_direct_nav }: { selected_direct_nav: string } = useSelector(
    (state: any) => state.navigation
  )
  return (
    <section className='w-full flex items-start relative overflow-hidden h-[96.5vh] bg-bg_color mt-auto rounded-tl-[9px]'>
      <div className='flex items-start h-full min-w-full'>
        <DirectSideBar />
        <Chat />
      </div>
      <DirectTopBar />
      <div className='mt-[75px] w-full'>
        {selected_direct_nav === 'add_friend' && <SendFriendRequest />}
        {selected_direct_nav === 'Pending' && <PendingRequests />}
      </div>
    </section>
  )
}

export default SideScreen
