import DirectSideBar from './direct_side_bar'
import DirectTopBar from './direct_top_bar'

const SideScreen = () => {
  return (
    <section className='w-full flex items-start relative overflow-hidden h-[96.5vh] bg-bg_color mt-auto rounded-tl-[9px]'>
      <DirectSideBar />
      <DirectTopBar />
    </section>
  )
}

export default SideScreen
