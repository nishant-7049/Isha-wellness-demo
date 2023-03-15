import { useLocation } from 'react-router-dom'

function SingleBlog() {
  const { state } = useLocation()

  return <div className='mt-20'>SingleBlog {state.blogId}</div>
}

export default SingleBlog
