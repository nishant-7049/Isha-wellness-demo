import React from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const data = [
  {
    id: 0,
    image: `/images/img (1).png`,
    name: `Maria Kate`,
    title: `Web Developer`,
    review: `"Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus et deleniti nesciunt sint eligendi reprehenderit reiciendis."`,
  },
  {
    id: 1,
    image: `/images/img (2).png`,
    name: `Maria Kate`,
    title: `Web Developer`,
    review: `"Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus et deleniti nesciunt sint eligendi reprehenderit reiciendis."`,
  },
  {
    id: 2,
    image: `/images/img (3).png`,
    name: `Maria Kate`,
    title: `Web Developer`,
    review: `"Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus et deleniti nesciunt sint eligendi reprehenderit reiciendis."`,
  },
]

const Slider_testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: true,
  }
  return (
    <Container>
      <Slider className='slider' {...settings}>
        {data.map((data) => {
          return (
            <Item key={data.id}>
              <Image>
                <img src={data.image} alt='' />
              </Image>
              <Content>
                <h3>{data.name}</h3>
                <h5>{data.title}</h5>
                <p>{data.review}</p>
              </Content>
            </Item>
          )
        })}
      </Slider>
    </Container>
  )
}

export default Slider_testimonial

const Container = styled.div`
  .slider {
    margin: 2rem auto;
    padding: 1rem;
    cursor: grab;
    background-color: #fff;
    max-width: 35%;
    border-radius: 1rem;
  }
`
const Item = styled.div`
  margin: 1.5rem auto;
`

const Image = styled.div`
  img {
    border-radius: 50%;
    max-width: 8rem;
    margin: 0 auto 2rem auto;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.3);
  }
`

const Content = styled.div`
  p,
  h5 {
    max-width: 25rem;
    margin: 1rem auto;
  }

  h3 {
    color: #f4b9d2;
  }
`
