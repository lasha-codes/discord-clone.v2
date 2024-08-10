import { useSelector } from 'react-redux'
import { request } from '../library/slices/user'

const PendingRequests = () => {
  const {
    requests,
    requests_loading,
  }: { requests: request[]; requests_loading: boolean } = useSelector(
    (state: any) => state.user
  )
  return (
    <section className=''>
      <div className=''>
        {requests.map((pending, idx: number) => {
          return <div key={idx} className=''></div>
        })}
      </div>
    </section>
  )
}

export default PendingRequests
