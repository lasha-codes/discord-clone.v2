import { Link } from 'react-router-dom'
import { useState } from 'react'
import DatePicker from './date_picker'

const RegisterForm = () => {
  const [email, setEmail] = useState<string | number>('')
  const [password, setPassword] = useState<string>('')
  const [nickname, setNickname] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [day, setDay] = useState<null | number>(null)
  const [month, setMonth] = useState<null | string>(null)
  const [year, setYear] = useState<null | string>(null)

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
    1872, 1873, 1874, 1875, 1876, 1877, 1878, 1879, 1880, 1881, 1882, 1883,
    1884, 1885, 1886, 1887, 1888, 1889, 1890, 1891, 1892, 1893, 1894, 1895,
    1896, 1897, 1898, 1899, 1900, 1901, 1902, 1903, 1904, 1905, 1906, 1907,
    1908, 1909, 1910, 1911, 1912, 1913, 1914, 1915, 1916, 1917, 1918, 1919,
    1920, 1921, 1922, 1923, 1924, 1925, 1926, 1927, 1928, 1929, 1930, 1931,
    1932, 1933, 1934, 1935, 1936, 1937, 1938, 1939, 1940, 1941, 1942, 1943,
    1944, 1945, 1946, 1947, 1948, 1949, 1950, 1951, 1952, 1953, 1954, 1955,
    1956, 1957, 1958, 1959, 1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967,
    1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979,
    1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991,
    1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003,
    2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015,
    2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
  ]

  console.log(years)

  return (
    <div className='bg-[#313338] rounded-md px-8 py-10 z-[50] absolute w-[500px] top-1/4 flex left-1/2 translate-x-[-50%] flex-col items-center gap-4'>
      <div className='flex flex-col items-center gap-2'>
        <h3 className='font-medium text-2xl text-white'>Create an account</h3>
      </div>
      <form className='w-full flex flex-col gap-4'>
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
            <DatePicker date='Day' data={daysOfMonth} setDate={setDay} />
            <DatePicker date='Month' data={months} setDate={setMonth} />
            <DatePicker date='Year' data={years} setDate={setYear} />
          </div>
        </div>
        <div className='flex flex-col items-start gap-3'>
          <button className='w-full bg-[#5865F2] mt-3 text-white py-2.5 rounded font-medium hover:bg-[#3f4dec] transition-all duration-150 ease-linear'>
            Continue
          </button>
          <Link to='/login' className='text-[#00A8FC] hover:underline text-sm'>
            Already have an account?
          </Link>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm
