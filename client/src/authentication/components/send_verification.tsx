import axios from 'axios'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { change_verification } from '../../library/slices/navigation'
import { useSelector } from 'react-redux'

const SendVerification = () => {
  const dispatch = useDispatch()
  const { verification_sent } = useSelector((state: any) => state.navigation)
  const send_verification = async () => {
    try {
      await axios.post('/auth/verify_email', { auto_mail: true })
      dispatch(change_verification({ stage: true }))
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  return (
    <div className='bg-[#313338] p-10 z-[99]'>
      <p className='text-white'>Account u have registered is not verified</p>
      <button
        onClick={send_verification}
        className='w-full bg-[#5865F2] mb-5 mt-3 text-white py-2.5 rounded font-medium hover:bg-[#3f4dec] transition-all duration-150 ease-linear'
      >
        Verify account
      </button>
      {verification_sent && (
        <p className='text-green-600 font-medium text-[17px] verification-text'>
          Please verify your email
        </p>
      )}

      {verification_sent === 'verified' && (
        <p className='text-green-600 font-medium text-[17px] verification-text'>
          Email verified
        </p>
      )}
    </div>
  )
}

export default SendVerification
