import React, { useEffect, useState } from 'react'
import Feed from '../components/Forum/Feed'
import QuestionButton from '../components/Forum/QuestionButton'
import { motion } from 'framer-motion'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Loading = () => {
  return (
    <div className='text-center items-center flex justify-center h-[50vh]'>
      <div className='animate-spin h-[5rem] w-[5rem] bg-white rounded-full border-[0.5rem] border-[#50acfb] border-t-[white]'></div>
    </div>
  )
}


const ForumPage = () => {
  const [forumData, setForumData] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const getForumData = async () => {
    const { data } = await axios
      .get('http://localhost:5000/api/forum/getforumdata')
      .catch((err) => {
        console.log(err.message)
      })
    setLoading(false)
    setForumData(data)
  }

  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
      navigate('/')
      window.alert('Please login to access!')
    } else {
      if (loading) {
        getForumData()
      }
    }
  }, [loading])

  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { type: 'spring', duration: 0.5, bounce: 0.5 },
      }}
    >
      <h3 className='text-[#50acfb] mt-[4.5rem] pt-4 bg-gray-200 text-center text-2xl'>
        Forum
      </h3>

      {loading ? (
        <Loading />
      ) : (
        <div className='px-[5rem] w-70 py-[2rem]  flex gap-8 flex-row justify-between bg-gray-200 sm:flex-col-reverse sm:px-4'>
          <Feed data={forumData} setLoading={setLoading} />
          <QuestionButton setLoading={setLoading} />
        </div>
      )}
    </motion.div>
  )
}

export default ForumPage
