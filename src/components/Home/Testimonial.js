import React from 'react'
import styled from 'styled-components'
import SliderTestimonial from './Slider_testimonial'

const Testimonial = () => {
  return (
    <Container>
      <div className='contain'>
        <h2>Testimonials</h2>
        <p className='con-para'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
          numquam repellendus eum mollitia suscipit excepturi nulla molestiae,
          natus id velit.
        </p>
        <SliderTestimonial />
      </div>
    </Container>
  )
}

export default Testimonial

const Container = styled.div`
  margin-top: 5rem;
  z-index: 100;
  align-items: center;
  text-align: center;
  padding: 2rem 0;
  background-color: #f4c9db;

  .contain {
    margin: 1.5rem 5rem !important;
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
`
