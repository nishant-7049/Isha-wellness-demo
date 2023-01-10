import React from 'react'
import styled from 'styled-components'
import SliderBlogs from './Slider-blogs'

const Blogs = () => {
  return (
    <Container>
      <div>
        <h2 className='blog-h'>Blogs</h2>
        <p className='blog-text'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur,
          reprehenderit. Nulla modi laudantium dolores. Esse debitis excepturi a
          rerum consequatur!
        </p>
        <div className='slides'>
          <SliderBlogs />
        </div>
      </div>
    </Container>
  )
}

export default Blogs

const Container = styled.div`
  padding: 3rem 2rem;

  SliderBlogs {
    margin: 0 auto;
  }

  .blog-h {
    color: #f4b9d2;
    text-align: center;
    margin: 1rem;
  }

  .blog-text {
    text-align: center;
    margin: 1rem auto;
    max-width: 70%;
  }

  .slides {
    margin: 12vh auto;
  }
`
