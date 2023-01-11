import React from 'react'
import styled from 'styled-components'

const data = [
  {
    id: 0,
    processName: `Process 1`,
    processImg: `/images/process1.jpg`,
    process: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo debitis ipsam corporis, officiis omnis perspiciatis?`,
  },
  {
    id: 1,
    processName: `Process 2`,
    processImg: `/images/process2.jpg`,
    process: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo debitis ipsam corporis, officiis omnis perspiciatis?`,
  },
  {
    id: 2,
    processName: `Process 3`,
    processImg: `/images/process3.jpg`,
    process: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo debitis ipsam corporis, officiis omnis perspiciatis?`,
  },
  {
    id: 3,
    processName: `Process 4`,
    processImg: `/images/process4.jpg`,
    process: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo debitis ipsam corporis, officiis omnis perspiciatis?`,
  },
]

const ProcessCards = () => {
  return (
    <Container>
      <div className='process-grid'>
        {data.map((data) => {
          return (
            <div key={data.id} className='process-item'>
              <div className='card'>
                <img src={data.processImg} alt='' />
                <div className='card-con'>
                  <h1 className='card-head'>{data.processName}</h1>
                  <p className='card-text'>{data.process}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Container>
  )
}

export default ProcessCards

const Container = styled.div`
  font-family: Verdana, Geneva, Tahoma, sans-serif;

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
