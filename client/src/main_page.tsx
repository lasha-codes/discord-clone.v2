import SideScreen from './components/side_screen'
import SideBar from './components/sidebar'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const MainPage = () => {
  const navigate = useNavigate()
  const { loading, account } = useSelector((state: any) => state.user)
  useEffect(() => {
    console.log(loading, account)
    if (!loading && !account) {
      return navigate('/login')
    }
    if (!loading && account && !account.verified) {
      return navigate('/send_email_verification')
    }
  }, [account, loading])

  return (
    <div className='flex items-start bg-sidebar_color min-h-screen'>
      <SideBar />
      <SideScreen />
    </div>
  )
}

export default MainPage
