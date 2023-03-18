import React from 'react'
import ForemBox from './ForemBox'
import ForemPost from './ForemPost'

const Feed = ({ data }) => {
  return (
    <div className=' bg-gray-200 flex flex-col gap-2 flex-auto '>
      <ForemBox />
      {data
        .slice(0)
        .reverse()
        .map((item) => {
          return <ForemPost key={item._id} item={item} />
        })}
    </div>
  )
}

export default Feed
