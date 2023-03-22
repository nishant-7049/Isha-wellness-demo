import React, { useEffect, useState } from 'react'
import Blogs from '../components/Home/Blogs'
import FAQ from '../components/Home/FAQ'
import Hero from '../components/Home/Hero'
import Services from '../components/Home/Services'
import Testimonial from '../components/Home/Testimonial'
import Therapist from '../components/Home/Therapist'
import Vision from '../components/Home/Vision'
import Achievement from '../components/about/Achievement'
import LocateUs from '../components/Home/LocateUs'
import { motion, AnimatePresence } from 'framer-motion'
import Notification from '../components/Notification'

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
        <Hero />
        <Vision />
        <Achievement />
        <div className='bg-[url(/images/geometricBG.jpg)] bg-cover bg-center bg-fixed'>
          <Services />
        </div>
        <LocateUs />
        <div className='bg-[url(/images/geometricBG.jpg)] bg-cover bg-center bg-fixed'>
          <Therapist />
        </div>
        <Blogs />
        <div className='bg-[url(/images/geometricBG.jpg)] bg-cover bg-center bg-fixed'>
          <Testimonial />
        </div>
        <FAQ />
      </div>
    </motion.div>
  )
}

export default Home
