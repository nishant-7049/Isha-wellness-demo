import React, { useEffect, useState } from 'react'
import Blogs from '../components/Home/Blogs'
import FAQ from '../components/Home/FAQ'
import Hero from '../components/Home/Hero'
import Services from '../components/Home/Services'
import Testimonial from '../components/Home/Testimonial'
import Therapist from '../components/Home/Therapist'
import Vision from '../components/Home/Vision'
import Achievement from '../components/About/Achievement'
import LocateUs from '../components/Home/LocateUs'
import Video from '../components/Home/Video'
import { motion, AnimatePresence } from 'framer-motion'
import Notification from '../components/Home/Notification'
import WA_Notify from '../components/Home/WA_Notify'

const Home = () => {
  const [notification, setNotification] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setNotification(false)
    }, 10000)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className='relative'>
        <AnimatePresence>
          {notification ? <Notification /> : ''}
        </AnimatePresence>
        <WA_Notify />
        <Hero />
        <Vision />
        <div className='mx-20 sm:mx-10'>
          <Achievement />
        </div>
        <div className='bg-[url(/images/bg/geometricBG.jpg)] bg-cover bg-center bg-fixed  h-[160vh] sm:h-[310vh]'>
          <Services />
        </div>
        <LocateUs />
        <div className='bg-[url(/images/bg/geometricBG.jpg)] bg-cover bg-center bg-fixed'>
          <Therapist />
        </div>
        <Blogs />
        <div className='bg-[url(/images/bg/geometricBG.jpg)] bg-cover bg-center bg-fixed'>
          <Testimonial />
        </div>
        <FAQ />
        <div className='bg-[url(/images/bg/geometricBG.jpg)] bg-cover bg-center bg-fixed'>
          <Video />
        </div>
      </div>
    </motion.div>
  )
}

export default Home
