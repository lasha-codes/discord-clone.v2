import SideScreen from './components/side_screen'
import SideBar from './components/sidebar'

const App = () => {
  return (
    <div className='flex items-start bg-sidebar_color min-h-screen'>
      <SideBar />
      <SideScreen />
    </div>
  )
}

export default App
