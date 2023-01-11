import React from 'react'
import styled from 'styled-components'
import ProcessCards from './ProcessCards'

const Process = () => {
  return (
    <Container>
      <div className='process container'>
        <h2>Our Process</h2>
        <p className='process-para con-para'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Est vitae
          fugiat tempore fugit animi? Beatae a neque porro impedit aperiam.
        </p>
        <ProcessCards />
      </div>
    </Container>
  )
}

export default Process

const Container = styled.div`
  font-family: Verdana, Geneva, Tahoma, sans-serif;

  .container {
    min-height: 100vh;
    padding: 3rem 0;
  }

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
