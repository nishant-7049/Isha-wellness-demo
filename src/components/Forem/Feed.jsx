import React from 'react'
import ForemBox from './ForemBox'
import ForemPost from './ForemPost'

const Feed = () => {
  return (
    <div className=' bg-gray-200 flex flex-col gap-2 flex-auto '>
        <ForemBox />
        <ForemPost />
        <ForemPost />
        <ForemPost />
    </div>
  )
}

export default Feed