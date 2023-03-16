import { useLocation } from 'react-router-dom'

function SingleBlog() {
  const { state } = useLocation()

  return <div className='mt-20'>
    <h3 className='text-[#f480b1] text-2xl text-center'>Blog</h3>
    <div className='flex m-20 gap-5'>
      <div className='flex-0 w-1/2 object-contain'>
        <img src={state.data.blogImg} alt="" />
      </div>
      <div className='flex flex-1 flex-col '>
        <h2 className='text-[1.5rem] font-bold text-[#f480b1]'>{state.data.topic}</h2>
        <p className='mb-2'>{state.data.senderName} || {state.data.sentDate}</p>
        <p>{state.data.blogText}</p>
      </div>
    </div>
  </div>
}

export default SingleBlog
