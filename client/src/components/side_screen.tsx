import DirectSideBar from './direct_side_bar'

const SideScreen = () => {
  return (
    <section className='w-full flex items-start overflow-hidden h-[96.5vh] bg-bg_color mt-auto rounded-tl-[9px]'>
      <DirectSideBar />
    </section>
  )
}

export default SideScreen
