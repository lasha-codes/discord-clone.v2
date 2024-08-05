/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoIosArrowDown } from 'react-icons/io'

const DatePicker = ({
  date,
  setDate,
  data,
}: {
  date: string
  setDate: React.SetStateAction<any>
  data: string[] | number[]
}) => {
  return (
    <div className='bg-[#1E1F22] px-3 rounded-[5px] py-2 flex w-[125px] items-center justify-between relative'>
      <div className='absolute w-full bg-[#2b2b30] date_picker border rounded-b-[5px] border-black top-[-200px] left-0 h-[200px] overflow-y-scroll'>
        {data.map((date, idx: number) => {
          return (
            <div
              key={idx}
              onClick={() => setDate(date)}
              className='text-gray-300 py-2 hover:bg-gray-500/15 transition-all duration-[30ms] px-4 cursor-pointer hover:text-white'
            >
              {date}
            </div>
          )
        })}
      </div>
      <span className='text-[#8E959E]'>{date}</span>
      <IoIosArrowDown className='text-white cursor-pointer' />
    </div>
  )
}

export default DatePicker
