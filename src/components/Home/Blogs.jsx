import React from 'react'
import styled from 'styled-components'
import SliderBlogs from './Slider-blogs'

const Blogs = () => {
  return (
    <Container>
      <div className='blogs'>
        <h2 className='blog-h'>Blogs</h2>
        <p className='blog-text'>
          Read our blogs
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
  .blogs {
    margin: 2rem 5rem;
    padding-top: 1rem;
    padding-bottom: 4rem;
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
    margin: 2rem auto;
  }

  @media (max-width: 480px) {
    .blogs {
      margin: 1rem 0.5rem;
      padding: 1rem 0;
    }

    .blog-text {
      max-width: 95%;
      font-size: small;
    }

    .slides {
      margin: 1rem auto;
    }
  }
`
