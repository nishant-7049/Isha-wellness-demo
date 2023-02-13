import React from 'react'
import styled from 'styled-components'

function Vision() {
  return (
    <Container>
      <div className='vision'>
        <div class='heading'>
          <h2>Our Vision & Mission</h2>
          <p>
            Isha Wellness Centre is an innovative holistic treatment program
            which focus on strengthening of all aspects of wellness in your
            life. Primary objective of developing this system is to avail
            wellness therapy services through wellness facilitators all over the
            globe.
          </p>
        </div>
      </div>
    </Container>
  )
}

export default Vision

const Container = styled.div`
  .vision {
    margin: 2rem 5rem;
  }

  .heading {
    text-align: center;
    font-size: large;
    color: white;
    padding: 2rem;

    h2 {
      margin: 1rem 0;
      padding-bottom: 1rem;
      font-weight: 800;
      color: #f4c9db;
    }
  }

  p {
    font-size: large;
    color: rgb(99, 88, 88);
    width: 70%;
    margin: auto;
  }

  @media (max-width: 480px) {
    .vision {
      margin: 1rem;
    }

    .heading {
      font-size: small;
      padding: 0rem;
    }

    p {
      font-size: small;
      width: 100%;
    }
  }
`
