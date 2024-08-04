import SideScreen from './components/side_screen'
import SideBar from './components/sidebar'

const MainPage = () => {
  return (
    <div className='flex items-start bg-sidebar_color min-h-screen'>
      <SideBar />
      <SideScreen />
    </div>
  )
}

export default MainPage
