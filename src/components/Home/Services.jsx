import React from 'react'
import styled from 'styled-components'
import ServicesCards from './ServicesCards'

const Process = () => {
  return (
    <Container className='process'>
      <h2>Our Services</h2>
      <ServicesCards />
    </Container>
  )
}

export default Process

const Container = styled.div`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  min-height: 100vh;
  padding: 3rem 0;
  padding-bottom: 0;

  h2 {
    text-align: center;
    margin-bottom: 1rem;
    color: #f4b9d2;
    text-transform: capitalize;
  }

  .con-para {
    max-width: 70%;
    margin: 0 20%;
    text-align: center;
    margin-bottom: 2rem;
  }
`
