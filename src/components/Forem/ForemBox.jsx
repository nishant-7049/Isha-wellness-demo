import React from 'react'
import { RxAvatar } from 'react-icons/rx'

const ForemBox = () => {
  return (
    <div className=' bg-white shadow-lg py-3 px-5'> 
        <RxAvatar className='text-3xl text-[#f480b1]' />
        <p className='text-[#9b9b9b]'>
            What is your question or link?
        </p>
    </div>
  )
}

export default ForemBox