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
  background-color: #f4c9db;

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
