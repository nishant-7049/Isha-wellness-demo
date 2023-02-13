import React from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const data = [
  {
    id: 0,
    image: `/images/img (1).png`,
    name: `NEEL TC`,
    review: `"So glad that I joined here. The atmosphere is very friendly and my results personally feels so good."`,
  },
  {
    id: 1,
    image: `/images/img (2).png`,
    name: `KAVITA CHAWLA`,
    review: `"I am KAVITA CHAWLA I lived in Ahmedabad I have back pain & foot pain for that I visited many doctors in Ratlam as well as in Ahmedabad but I don't get... read more"`,
  },
  {
    id: 2,
    image: `/images/img (3).png`,
    name: `SANJAY SONI`,
    review: `"Best therapy centre with very nice atmosphere and careable staff.They cure my back pain in very less time."`,
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
    responsive: [
      {
        breakpoint: 800,
        settings: {
          dots: false,
          arrows: false,
          pauseOnHover: false,
        },
      },
    ],
  }
  return (
    <Container>
      <Slider className='slider' {...settings}>
        {data.map((data) => {
          return (
            <Item key={data.id}>
              <Content>
                <p>{data.review}</p>
                <h3>{data.name}</h3>
                <h5>&#9733; &#9733; &#9733; &#9733; &#9733;</h5>
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
    cursor: pointer;
    background-color: #fff;
    max-width: 60%;
    border-radius: 1rem;

    @media (max-width: 480px) {
      margin: 1rem auto;
      padding: 0rem;
      max-width: 90%;
      border-radius: 0.5rem;
    }
  }
`
const Item = styled.div`
  margin: 1.5rem auto;

  @media (max-width: 480px) {
    margin: 1rem auto;
  }
`

const Content = styled.div`
  p,
  h5 {
    max-width: 25rem;
    margin: auto;
  }

  h3 {
    color: #f4b9d2;
  }

  h5 {
    color: pink;
    font-size: x-large;
    margin: 1rem auto;
  }

  @media (max-width: 480px) {
    p,
    h5 {
      max-width: 100%;
      font-size: small;
    }

    h5 {
      margin: 0.5rem auto;
    }
  }
`
