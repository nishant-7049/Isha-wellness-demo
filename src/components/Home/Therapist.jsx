import React, { useEffect } from 'react'
import styled from 'styled-components'
import SliderTherapist from './Slider.therapist'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Therapist = () => {
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
      >
        <div className='therapists container'>
          <h2 className='therapists-head con-head text-3xl'>
            Physiotherapists at your service
          </h2>
          <p className='therapists-para con-para text-white'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde velit
            exercitationem ex expedita, nesciunt ullam officia obcaecati ad
            magni ratione!
          </p>
          <SliderTherapist />
        </div>
      </motion.div>
    </Container>
  )
}

export default Therapist

const Container = styled.div`
  // background-color: #50acfb;

  .container {
    padding: 5rem 0;
    margin: auto;
  }

  .con-head {
    text-align: center;
    color: #fff;
    margin-bottom: 1rem;
    text-transform: capitalize;
  }

  .con-para {
    max-width: 70%;
    margin: 0 20%;
    text-align: center;
    margin-bottom: 2rem;
  }

  .therapists {
    position: relative;
  }

  @media (max-width: 480px) {
    .container {
      padding: 2rem 0;
    }

    .con-head {
      margin-left: 1rem;
      margin-right: 1rem;
    }

    .con-para {
      max-width: 95%;
      margin: 0 1rem;
      margin-bottom: 1rem;
    }
  }
`
