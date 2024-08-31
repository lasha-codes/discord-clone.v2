/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from 'react-redux'
import default_avatar from '../assets/default_avatar.png'
import { IoClose } from 'react-icons/io5'
import { IoCheckmark } from 'react-icons/io5'
import axios from 'axios'
import { socket } from '../App'
import { useDispatch } from 'react-redux'
import { add_friend, remove_request } from '../library/slices/user'

const PendingRequests = () => {
  const dispatch = useDispatch()
  const { requests, account } = useSelector((state: any) => state.user)

  const delete_request = async (request_id: string, member: string) => {
    try {
      const {
        data: { deleted_request },
      } = await axios.post('/auth/delete_request', { request_id })
      socket.emit('delete_request', {
        deleted_request: deleted_request,
        member_id: account.id,
      })
      dispatch(remove_request({ deleteId: request_id, member }))
    } catch (err) {
      console.log(err)
    }
  }

  const accept_friend_request = async (request_id: string, sender: any) => {
    try {
      const {
        data: { friends },
      } = await axios.post('/auth/accept_request', {
        request_id,
        sender,
        receiver: account,
      })
      if (friends) {
        socket.emit('accept_request', {
          new_friends: friends,
          sender,
          requestId: request_id,
        })
        dispatch(
          add_friend({
            new_friends: friends,
            friendAs: 'second',
            requestId: request_id,
          })
        )
      } else {
        console.log('something went wrong')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <section className='px-10'>
      <div className='flex flex-col items-start gap-4'>
        {requests?.[0].sent &&
          requests[0].sent?.length > 0 &&
          requests[0].sent.map((pending: any, idx: number) => {
            const avatar = pending.receiver.image_url || default_avatar
            return (
              <div
                key={idx}
                className='w-full flex justify-between request items-center border-b pb-4 border-gray-500'
              >
                <div className='flex items-center gap-3'>
                  <div className='w-[50px] h-[50px] rounded-full overflow-hidden'>
                    <img src={avatar} />
                  </div>
                  <div className='flex flex-col items-start'>
                    <h4 className='text-gray-100 font-medium'>
                      {pending.receiver.username}
                    </h4>
                    <p className='text-gray-500 text-sm'>
                      Outgoing Friend Request
                    </p>
                  </div>
                </div>
                <div
                  onClick={() => delete_request(pending.id, 'sender')}
                  className='p-2.5 rounded-full bg-sidebar_color/80 cursor-pointer hover:bg-sidebar_color transition-all duration-200 ease-out text-2xl text-red-600'
                >
                  <IoClose />
                </div>
              </div>
            )
          })}
        {requests?.[1]?.received &&
          requests[1].received?.length > 0 &&
          requests[1].received.map((pending: any, idx: number) => {
            const avatar = pending.sender.image_url || default_avatar
            return (
              <div
                key={idx}
                className='w-full flex justify-between request items-center border-b pb-4 border-gray-500'
              >
                <div className='flex items-center gap-3'>
                  <div className='w-[50px] h-[50px] rounded-full overflow-hidden'>
                    <img src={avatar} />
                  </div>
                  <div className='flex flex-col items-start'>
                    <h4 className='text-gray-100 font-medium'>
                      {pending.sender.username}
                    </h4>
                    <p className='text-gray-500 text-sm'>
                      Incoming Friend Request
                    </p>
                  </div>
                </div>
                <div className='flex flex-row-reverse items-center gap-4'>
                  <div
                    onClick={() => delete_request(pending.id, 'receiver')}
                    className='p-2.5 rounded-full bg-sidebar_color/80 cursor-pointer hover:bg-sidebar_color transition-all duration-200 ease-out text-2xl text-red-600'
                  >
                    <IoClose />
                  </div>
                  <div
                    onClick={() =>
                      accept_friend_request(pending.id, pending.sender)
                    }
                    className='p-2.5 rounded-full bg-sidebar_color/80 cursor-pointer hover:bg-sidebar_color transition-all duration-200 ease-out text-2xl text-green-500'
                  >
                    <IoCheckmark />
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </section>
  )
}

export default PendingRequests
