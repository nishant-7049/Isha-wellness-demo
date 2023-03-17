import React, { useEffect, useState } from 'react'
import Feed from '../components/Forem/Feed'
import QuestionButton from '../components/Forem/QuestionButton'
import axios from 'axios'

const ForemPage = () => {
  const [forumData, setForumData] = useState([])

  const getForumData = async () => {
    const { data } = await axios
      .get('https://isha-server.onrender.com/api/forum/getforumdata')
      .catch((err) => {
        console.log(err.message)
      })

    // console.log(data)
    setForumData(data)
  }

  useEffect(() => {
    getForumData()
  }, [])

  return (
    <div>
      <h3 className='text-[#f480b1] mt-[4.5rem] pt-4 bg-gray-200 text-center text-2xl'>
        Forem
      </h3>

      <div className='px-[5rem] w-70 py-[2rem]  flex gap-8 flex-row justify-between bg-gray-200 sm:flex-col-reverse sm:px-4'>
        <Feed data={forumData} />
        <QuestionButton />
      </div>
    </div>
  )
}

export default ForemPage
