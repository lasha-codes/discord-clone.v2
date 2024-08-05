/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoIosArrowDown } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import {
  select_date_picker,
  close_date_picker,
} from '../../library/slices/navigation'

const DatePicker = ({
  date,
  setDate,
  data,
  actual_date,
}: {
  date: string
  setDate: React.SetStateAction<any>
  data: string[] | number[]
  actual_date: any
}) => {
  const dispatch = useDispatch()
  const { date_picker }: { date_picker: string | null } = useSelector(
    (state: any) => state.navigation
  )

  const whenIsOpen = () => {
    if (date.toLowerCase() === date_picker?.toLowerCase()) {
      return true
    } else {
      return false
    }
  }

  const open: boolean = whenIsOpen()

  return (
    <div className='bg-[#1E1F22] px-3 rounded-[5px] py-2 flex w-[125px] items-center justify-between relative'>
      <div
        className={`absolute w-full bg-[#2b2b30] date_picker border rounded-b-[5px] border-black top-[-200px] left-0 h-[200px] overflow-y-scroll transition-all duration-[70ms] shadow-sm shadow-black ${
          open
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {data.map((date, idx: number) => {
          return (
            <div
              key={idx}
              onClick={() => {
                setDate(date)
                dispatch(close_date_picker())
              }}
              className='text-gray-300 py-2 hover:bg-gray-500/15 transition-all duration-[30ms] px-4 cursor-pointer hover:text-white'
            >
              {date}
            </div>
          )
        })}
      </div>
      <span className='text-[#8E959E]'>{actual_date || date}</span>
      <IoIosArrowDown
        onClick={() =>
          dispatch(select_date_picker({ date: date.toLowerCase() }))
        }
        className='text-gray-300 hover:text-white transition-all duration-[100ms] cursor-pointer'
      />
    </div>
  )
}

export default DatePicker
