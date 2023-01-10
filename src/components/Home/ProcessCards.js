import React from 'react'
import styled from 'styled-components'

const ProcessCards = () => {
  return (
    <Container>
      <div className='process-grid'>
        <div className='process-item'>
          <div className='card'>
            <img src='/images/process1.jpg' alt='' />
            <div className='card-con'>
              <h1 className='card-head'>Process 1</h1>
              <p className='card-text'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo debitis ipsam corporis, officiis omnis perspiciatis?
              </p>
            </div>
          </div>
        </div>
        <div className='process-item'>
          <div className='card'>
            <img src='/images/process2.jpg' alt='' />
            <div className='card-con'>
              <h1 className='card-head'>Process 2</h1>
              <p className='card-text'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo debitis ipsam corporis, officiis omnis perspiciatis?
              </p>
            </div>
          </div>
        </div>
        <div className='process-item'>
          <div className='card'>
            <img src='/images/process3.jpg' alt='' />
            <div className='card-con'>
              <h1 className='card-head'>Process 3</h1>
              <p className='card-text'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo debitis ipsam corporis, officiis omnis perspiciatis?
              </p>
            </div>
          </div>
        </div>
        <div className='process-item'>
          <div className='card'>
            <img src='/images/process4.jpg' alt='' />
            <div className='card-con'>
              <h1 className='card-head'>Process 4</h1>
              <p className='card-text'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo debitis ipsam corporis, officiis omnis perspiciatis?
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ProcessCards

const Container = styled.div`
  .process-grid {
    margin: 6rem auto;
    display: grid;
    width: 80%;
    grid-gap: 3rem;
    grid-template-columns: repeat(auto-fit, minmax(20%, 1fr));
    align-items: start;
  }

  .process-item {
    border-radius: 0.4rem;
    overflow: hidden;
    box-shadow: 0 3rem 6rem rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: 0.2s;
    box-shadow: 0 0 2rem rgba(0, 0, 0, 0.3);
  }

  // .process-item:hover {
  //   box-shadow: 0 0 2rem rgba(0, 0, 0, 0.3);
  // }

  .card img {
    display: block;
    width: 100%;
    height: 10rem;
    object-fit: cover;
  }

  .card-con {
    padding: 0.8rem;
  }

  .card-head {
    color: #f480b1;
    font-size: 1rem;
    font-weight: 500;
    text-align: center;
    margin-bottom: 0.7rem;
  }

  .card-text {
    font-size: 0.7rem;
    text-align: center;
  }
`