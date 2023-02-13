import React from 'react'
import Blogs from '../components/Home/Blogs'
import FAQ from '../components/Home/FAQ'
import Hero from '../components/Home/Hero'
import Process from '../components/Home/Services'
import Testimonial from '../components/Home/Testimonial'
import Therapist from '../components/Home/Therapist'
import Vision from '../components/Home/Vision'
import LocateUs from '../components/Home/LocateUs'

const Home = () => {
  return (
    <div>
      <Hero />
      <Vision/>
      <Process />
      <LocateUs/>
      <Therapist />
      <Blogs />
      <Testimonial />
      <FAQ/>
    </div>
  )
}

export default Home
