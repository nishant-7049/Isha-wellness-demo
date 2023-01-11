import React from 'react'
import Blogs from '../components/Home/Blogs'
import Hero from '../components/Home/Hero'
import Process from '../components/Home/Process'
import Testimonial from '../components/Home/Testimonial'
import Therapist from '../components/Home/Therapist'

const Home = () => {
  return (
    <div>
      <Hero />
      <Process />
      <Therapist />
      <Blogs />
      <Testimonial />
    </div>
  )
}

export default Home
