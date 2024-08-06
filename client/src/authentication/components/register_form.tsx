/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom'
import { useState } from 'react'
import DatePicker from './date_picker'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { change_verification } from '../../library/slices/navigation'

const RegisterForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState<string | number>('')
  const [password, setPassword] = useState<string>('')
  const [nickname, setNickname] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [day, setDay] = useState<null | number>(null)
  const [month, setMonth] = useState<null | string>(null)
  const [year, setYear] = useState<null | string>(null)
  const { verification_sent }: { verification_sent: boolean | 'verified' } =
    useSelector((state: any) => state.navigation)

  useEffect(() => {
    if (verification_sent === 'verified') {
      return navigate('/')
    }
  }, [verification_sent])

  const daysOfMonth = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ]

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const years = [
    2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013,
    2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001,
    2000, 1999, 1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990, 1989,
    1988, 1987, 1986, 1985, 1984, 1983, 1982, 1981, 1980, 1979, 1978, 1977,
    1976, 1975, 1974, 1973, 1972, 1971, 1970, 1969, 1968, 1967, 1966, 1965,
    1964, 1963, 1962, 1961, 1960, 1959, 1958, 1957, 1956, 1955, 1954, 1953,
    1952, 1951, 1950, 1949, 1948, 1947, 1946, 1945, 1944, 1943, 1942, 1941,
    1940, 1939, 1938, 1937, 1936, 1935, 1934, 1933, 1932, 1931, 1930, 1929,
    1928, 1927, 1926, 1925, 1924, 1923, 1922, 1921, 1920, 1919, 1918, 1917,
    1916, 1915, 1914, 1913, 1912, 1911, 1910, 1909, 1908, 1907, 1906, 1905,
    1904, 1903, 1902, 1901, 1900, 1899, 1898, 1897, 1896, 1895, 1894, 1893,
    1892, 1891, 1890, 1889, 1888, 1887, 1886, 1885, 1884, 1883, 1882, 1881,
    1880, 1879, 1878, 1877, 1876, 1875, 1874, 1873, 1872,
  ]

  const registerUser = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post('/auth/register', {
        username,
        email,
        password,
        birth_date: `${day} - ${month} - ${year}`,
        nickname,
      })
      await axios.post('/auth/verify_email', { email })
      setEmail('')
      setPassword('')
      setNickname('')
      setUsername('')
      setDay(null)
      setMonth(null)
      setYear(null)
      dispatch(change_verification({ stage: true }))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='bg-[#313338] rounded-md px-8 py-10 z-[50] absolute w-[500px] top-1/4 flex left-1/2 translate-x-[-50%] flex-col items-center gap-4'>
      <div className='flex flex-col items-center gap-2'>
        <h3 className='font-medium text-2xl text-white'>Create an account</h3>
      </div>
      <form onSubmit={registerUser} className='w-full flex flex-col gap-4'>
        <div className='flex flex-col items-start gap-1.5 w-full'>
          <label
            htmlFor='email_phone'
            className='text-[12px] text-[#B1B5BC] font-extrabold flex items-start gap-1'
          >
            EMAIL
            <span className='text-[8px] text-red-500'>*</span>
          </label>
          <input
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            type='email'
            id='email_phone'
            className='outline-none bg-[#1E1F22] px-3 py-2 rounded-[4px] w-full text-white'
          />
        </div>

        <div className='flex flex-col items-start gap-1.5 w-full'>
          <label
            htmlFor='nickname'
            className='text-[12px] text-[#B1B5BC] font-extrabold flex items-start gap-1'
          >
            DISPLAY NAME
          </label>
          <input
            value={nickname}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNickname(e.target.value)
            }
            type='text'
            id='nickname'
            className='outline-none bg-[#1E1F22] px-3 py-2 rounded-[4px] w-full text-white'
          />
        </div>

        <div className='flex flex-col items-start gap-1.5 w-full'>
          <label
            htmlFor='username'
            className='text-[12px] text-[#B1B5BC] font-extrabold flex items-start gap-1'
          >
            USERNAME <span className='text-[8px] text-red-500'>*</span>
          </label>
          <input
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            type='text'
            id='username'
            className='outline-none bg-[#1E1F22] px-3 py-2 rounded-[4px] w-full text-white'
          />
        </div>

        <div className='flex flex-col items-start gap-1.5 w-full'>
          <label
            htmlFor='password'
            className='text-[12px] text-[#B1B5BC] font-extrabold flex items-start gap-1'
          >
            PASSWORD <span className='text-[8px] text-red-500'>*</span>
          </label>
          <input
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            type='password'
            id='password'
            className='outline-none bg-[#1E1F22] px-3 py-2 rounded-[4px] w-full text-white'
          />
        </div>
        <div className='flex flex-col items-start gap-1.5'>
          <h4 className='text-[12px] text-[#B1B5BC] font-extrabold flex items-start gap-1'>
            DATE OF BIRTH <span className='text-[8px] text-red-500'>*</span>
          </h4>
          <div className='flex items-center gap-5'>
            <DatePicker
              actual_date={day}
              date='Day'
              data={daysOfMonth}
              setDate={setDay}
            />
            <DatePicker
              date='Month'
              actual_date={month}
              data={months}
              setDate={setMonth}
            />
            <DatePicker
              date='Year'
              data={years}
              actual_date={year}
              setDate={setYear}
            />
          </div>
        </div>
        <div className='flex flex-col items-start gap-2 w-full'>
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
          <div className='flex flex-col w-full items-start gap-3'>
            <button className='w-full bg-[#5865F2] mt-3 text-white py-2.5 rounded font-medium hover:bg-[#3f4dec] transition-all duration-150 ease-linear'>
              Continue
            </button>
            <Link
              to='/login'
              className='text-[#00A8FC] hover:underline text-sm'
            >
              Already have an account?
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm
