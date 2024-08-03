import { FaDiscord } from 'react-icons/fa6'

const SideBar = () => {
  return (
    <section className='flex w-[80px] items-center py-2 flex-col gap-4 min-h-screen bg-sidebar_color'>
      <div className='w-[52px] h-[52px] side_icon hover:bg-discord_color cursor-pointer duration-300 ease-in-out bg-bg_color flex items-center justify-center'>
        <FaDiscord className='text-white text-3xl' />
      </div>
      <div className='flex flex-col items-start gap-3'></div>
    </section>
  )
}

export default SideBar
