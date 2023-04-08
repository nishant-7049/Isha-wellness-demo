import React from 'react'
import { motion } from 'framer-motion'
import { ImWhatsapp } from 'react-icons/im'
import { FiPhoneCall } from 'react-icons/fi'

const WA_Notify = () => {
  return (
    <div className='flex flex-col-reverse wrap h-fit fixed gap-8 z-10 bottom-[2rem] right-10 sm:right-4'>
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        animate={{
          opacity: 1,
          x: 0,
          transition: { type: 'spring', duration: 1, bounce: 0.5 },
        }}
      >
        <a href='https://wa.me/+917383677661' target='_blank'>
          <span className='relative text-[#1ad03f] text-4xl z-10'>
            <ImWhatsapp />
            <span className='animate-ping absolute w-3 h-3 rounded-full bg-white top-0 left-0'></span>
          </span>
        </a>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        animate={{
          opacity: 1,
          x: 0,
          transition: { type: 'spring', duration: 1, bounce: 0.5 },
        }}
      >
        <a href='tel:+917383677661'>
          <span className='relative text-[#84adea] text-4xl z-10'>
            <FiPhoneCall />
            <span className='animate-ping absolute w-3 h-3 rounded-full bg-white top-0 left-0'></span>
          </span>
        </a>
      </motion.div>
    </div>
  )
}

export default WA_Notify
