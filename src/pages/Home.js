import React from 'react'
import styled from 'styled-components'
import Blogs from '../components/Home/Blogs'
import Hero from '../components/Home/Hero'
import Process from '../components/Home/Process'
import Testimonial from '../components/Home/Testimonial'
import Therapist from '../components/Home/Therapist'
const Home = () => {
  return (
    <Container>
      <div className='body'>
        <Hero />
        <Process />
        <Therapist />
        <Blogs />
        <Testimonial/>
      </div>
    </Container>
  )
}

export default Home

const Container = styled.div`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  .body {
    color: black;
    font-family: 'Work Sans', sans-serif;
    font-weight: 500;
    scroll-behavior: smooth;
  }
`
