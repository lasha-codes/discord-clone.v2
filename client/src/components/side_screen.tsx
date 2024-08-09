import DirectSideBar from './direct_side_bar'
import DirectTopBar from './direct_top_bar'
import { useSelector } from 'react-redux'
import SendFriendRequest from './send_friend_request'

const SideScreen = () => {
  const { selected_direct_nav }: { selected_direct_nav: string } = useSelector(
    (state: any) => state.navigation
  )
  return (
    <section className='w-full flex items-start relative overflow-hidden h-[96.5vh] bg-bg_color mt-auto rounded-tl-[9px]'>
      <DirectSideBar />
      <DirectTopBar />
      <div className='mt-[75px] w-full'>
        {selected_direct_nav === 'add_friend' && <SendFriendRequest />}
      </div>
    </section>
  )
}

export default SideScreen
