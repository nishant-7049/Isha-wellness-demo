import React, { useEffect, useState } from 'react'
import Feed from '../components/Forem/Feed'
import QuestionButton from '../components/Forem/QuestionButton'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import axios from 'axios'

const Loading = () => {
  return (
    <div className='text-center items-center flex justify-center h-[50vh]'>
      <div className='animate-spin h-[5rem] w-[5rem] bg-white rounded-full border-[0.5rem] border-[#50acfb] border-t-[white]'></div>
    </div>
  )
}

const ForemPage = () => {
  const [forumData, setForumData] = useState([])
  const [loading, setLoading] = useState(false)
  const { ref, inView } = useInView()
  const animation = useAnimation()

  const getForumData = async () => {
    const { data } = await axios
      .get('http://localhost:5000/api/forum/getforumdata')
      .catch((err) => {
        console.log(err.message)
      })
    setLoading(true)

    // console.log(data)
    setForumData(data)
  }

  useEffect(() => {
    if (inView) {
      animation.start({
        opacity: 1,
        y: 0,
        transition: { type: 'spring', duration: 0.5, bounce: 0.5 },
      })
    }
  }, [inView])

  useEffect(() => {
    getForumData()
  }, [])

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 200 }} animate={animation}>
      <h3 className='text-[#50acfb] mt-[4.5rem] pt-4 bg-gray-200 text-center text-2xl'>
        Forem
      </h3>

      {loading ? (
        <div className='px-[5rem] w-70 py-[2rem]  flex gap-8 flex-row justify-between bg-gray-200 sm:flex-col-reverse sm:px-4'>
          <Feed data={forumData} />
          <QuestionButton />
        </div>
      ) : (
        <Loading />
      )}
    </motion.div>
  )
}

export default ForemPage
