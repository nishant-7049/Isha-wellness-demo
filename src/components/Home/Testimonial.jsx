import React, { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import styled from 'styled-components'
import SliderTestimonial from './Slider_testimonial'

const Testimonial = () => {
  const { ref, inView } = useInView({ threshold: 0.5 })
  const animation = useAnimation()

  useEffect(() => {
    if (inView) {
      animation.start({
        opacity: 1,
        y: 0,
        transition: { duration: 1 },
      })
    }
  }, [inView])
  return (
    <Container>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 100 }}
        animate={animation}
        className='contain'
      >
        <h2 className='text-3xl'>Testimonials</h2>
        <p className='con-para text-white'>
          Here are some of the good things people have talked about.
        </p>
        <SliderTestimonial />
      </motion.div>
    </Container>
  )
}

export default Testimonial

const Container = styled.div`
  // background-color: #50acfb;

  .contain {
    margin: 1.5rem 5rem !important;
    margin-top: 5rem;
    z-index: 10;
    align-items: center;
    text-align: center;
    padding: 2rem 0;
  }

  h2,
  p,
  SliderTestimonial {
    margin: 1rem auto !important;
  }

  .con-para {
    max-width: 70%;
  }

  h2 {
    text-transform: capitalize;
    color: #fff;
  }

  @media (max-width: 480px) {
    .contain {
      margin: 0.5rem 0rem !important;
      margin-top: 1rem;
      padding: 0.5rem 0rem;
    }

    h2,
    p,
    SliderTestimonial {
      margin: 0.5rem auto !important;
    }

    .con-para {
      max-width: 100%;
    }
  }
`
