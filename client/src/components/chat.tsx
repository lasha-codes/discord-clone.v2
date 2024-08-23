export type User = {
  id: string
  email: string
  password: string
  username: string
  verified: boolean
  image_url: string | null
  birth_date: string
  display_name: string
  phone_number: string | null
}

const Chat = ({ user }: { user: User }) => {
  return (
    <section className='min-w-[calc(100%-225px)] ml-auto max-w-[calc(100%-225px)] relative min-h-full flex flex-col items-center px-5 bg-gray-400/5'>
      <div className='h-full bg-transparent flex flex-col items-start gap-5'></div>

      <div className='w-[97%] absolute bottom-4 translate-x-[10px] h-[43px] rounded-xl border border-white left-[0px]'></div>
    </section>
  )
}

export default Chat
