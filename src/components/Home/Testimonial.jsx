import React from 'react'
import styled from 'styled-components'
import SliderTestimonial from './Slider_testimonial'

const Testimonial = () => {
  return (
    <Container>
      <div className='contain'>
        <h2>Testimonials</h2>
        <p className='con-para'>
          Here are some of the good things people have talked about.
        </p>
        <SliderTestimonial />
      </div>
    </Container>
  )
}

export default Testimonial

const Container = styled.div`
  background-color: #f4c9db;

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
