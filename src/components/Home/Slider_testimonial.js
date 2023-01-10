import React from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Slider_testimonial = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: false,
  }
  return (
    <Container>
      <Slider className='slider' {...settings}>
        <Item>
          <Image>
            <img src='/images/img (1).png' alt='' />
          </Image>
          <Content>
            <h3>Maria Kate</h3>
            <h5>Web Developer</h5>
            <p>
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus et
              deleniti nesciunt sint eligendi reprehenderit reiciendis."
            </p>
          </Content>
        </Item>
        <Item>
          <Image>
            <img src='/images/img (2).png' alt='' />
          </Image>
          <Content>
            <h3>Maria Kate</h3>
            <h5>Web Developer</h5>
            <p>
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus et
              deleniti nesciunt sint eligendi reprehenderit reiciendis."
            </p>
          </Content>
        </Item>
        <Item>
          <Image>
            <img src='/images/img (3).png' alt='' />
          </Image>
          <Content>
            <h3>Maria Kate</h3>
            <h5>Web Developer</h5>
            <p>
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus et
              deleniti nesciunt sint eligendi reprehenderit reiciendis."
            </p>
          </Content>
        </Item>
      </Slider>
    </Container>
  )
}

export default Slider_testimonial

const Container = styled.div`
  .slick-next:before,
  .slick-prev:before {
    color: black;
  }

  .slider {
    margin: 2rem auto;
    padding: 2rem 1rem;
    cursor: grab;
    background-color: #fff;
    max-width: 35%;
    border-radius: 1rem;
  }
`
const Item = styled.div`
  margin: 1.5rem auto 1rem auto;
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
