import { useSelector } from 'react-redux'
import default_avatar from '../assets/default_avatar.png'
import { IoClose } from 'react-icons/io5'
import { FaPlus } from 'react-icons/fa6'

const PendingRequests = () => {
  const { requests, requests_loading, account } = useSelector(
    (state: any) => state.user
  )
  return (
    <section className=''>
      <div className=''>
        {Array.isArray(requests?.sent) ? (
          requests.sent.map((pending: any, idx: number) => {
            const avatar = pending.sender.image_url || default_avatar
            return (
              <div
                key={idx}
                className='w-full flex justify-between items-center'
              >
                <div className='flex items-center gap-1'>
                  <img src={avatar} />
                  <div className='flex flex-col items-start gap-0.5'>
                    <h4>{pending.sender.username}</h4>
                    <p>Outgoing Friend Request</p>
                  </div>
                </div>
                <div className=''>
                  <IoClose />
                </div>
              </div>
            )
          })
        ) : (
          <div className='w-full flex justify-between items-center'>
            <div className='flex items-center gap-1'>
              <img />
              <div className='flex flex-col items-start gap-0.5'>
                <h4>{requests.sent.username}</h4>
                <p>Outgoing Friend Request</p>
              </div>
            </div>
            <div className=''>
              <IoClose />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default PendingRequests
