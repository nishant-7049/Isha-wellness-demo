import React from 'react'
import styled from 'styled-components'
import SliderTherapist from './Slider.therapist'

const Therapist = () => {
  return (
    <Container>
      <div className='therapists container'>
        <h2 className='therapists-head con-head'>
          Physiotherapists at your service
        </h2>
        <p className='therapists-para con-para'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde velit
          exercitationem ex expedita, nesciunt ullam officia obcaecati ad magni
          ratione!
        </p>
        <SliderTherapist />
      </div>
    </Container>
  )
}

export default Therapist

const Container = styled.div`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  background-color: #f4c9db;

  .container {
    padding: 5rem 0;
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
`
